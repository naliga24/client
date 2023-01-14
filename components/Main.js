import Image from 'next/image'
import { RiSettings3Fill } from 'react-icons/ri'
import { AiOutlineDown } from 'react-icons/ai'
import { useContext, useEffect, useState, useMemo } from 'react'
import { TransactionContext } from '../context/TransactionContext'
import Modal from 'react-modal'
import { ethers } from "ethers";
import { useRouter } from 'next/router'
import TransactionLoader from './TransactionLoader'
import {
  swapTokensAvailable,
  quotePrice,
  getTransactionApprove,
  getTransactionSwap,
} from '../api/token';
import { NETWORKS_AVAILABLE } from '../utils/constants'
import SearchIcon from '@mui/icons-material/Search';

import {
  IoIosArrowBackIcon,
  Paper,
  InputBase,
  Divider,
  IconButton,
  SearchHeadWrapper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Input,
} from "./main.style"


Modal.setAppElement('#__next')

const style = {
  wrapper: `w-screen flex items-center justify-center mt-14 z-10`,
  content: `bg-[#191B1F] w-[40rem] rounded-2xl p-4 z-0`,
  formHeader: `px-2 flex items-center justify-between font-semibold text-xl`,
  transferPropContainer: `bg-[#20242A] my-3 rounded-2xl p-6 text-3xl  border border-[#20242A] hover:border-[#41444F]  flex justify-between`,
  transferPropInput: `bg-transparent placeholder:text-[#B2B9D2] outline-none mb-6 w-full text-2xl`,
  currencySelector: `flex w-1/4`,
  currencySelectorContent: `w-max w-full h-min flex justify-between items-center bg-[#2D2F36] hover:bg-[#41444F] rounded-2xl text-xl font-medium cursor-pointer p-2 mt-[-0.2rem]`,
  currencySelectorIcon: `w-max flex items-center`,
  currencySelectorTicker: `mx-2`,
  currencySelectorArrow: `text-lg`,
  confirmButton: `bg-[#2172E5] my-2 rounded-2xl py-6 px-8 text-xl font-semibold flex items-center justify-center !disabled:cursor-pointer !disabled:border-[#2172E5] !disabled:hover:border-[#234169] w-full disabled:bg-[#20242A] disabled:text-gray-400`,
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#0a0b0d',
    padding: 0,
    border: 'none',
  },
  overlay: {
    backgroundColor: 'rgba(10, 11, 13, 0.75)',
  },
}

const Main = () => {
  const [selectType, setSelectType] = useState('');
  const [availableSwapTokens, setAvailableSwapTokens] = useState([]);
  const [tokenFilter, setTokenFilter] = useState('');
  const [selectFromToken, setSelectFromToken] = useState(null);
  const [selectToToken, setSelectToToken] = useState(null);
  const [unit, setUnit] = useState('');
  const [quote, setQuote] = useState({});
  const [totalGas, setTotalGas] = useState(0);
  const [tokenReceive, setTokenReceive] = useState('');

  const {
    currentAccount,
    sendTransaction,
    currentNetwork,
    setIsLoading,
    isLoading,
    colectFees,
  } =
    useContext(TransactionContext)
  const router = useRouter()

  const setLoadingAll = (loading) => {
    setIsLoading(loading);
  }


  const callSwapToken = async () => {
    try {
      setLoadingAll(true);
      const amount = String(Number(ethers.utils.parseUnits(unit, selectFromToken.decimals)._hex))
      const chainId = currentNetwork.chainId;
      const web3RpcUrl = getNetworkData(chainId);
      const paramsFees = { chainId, walletAddress: currentAccount, value: totalGas };
      const paramsApprove = { fromToken: selectFromToken, walletAddress: currentAccount, amount, chainId, web3RpcUrl };
      const paramsSwap = { fromToken: selectFromToken, toToken: selectToToken, walletAddress: currentAccount, amount, chainId, web3RpcUrl };
      await colectFees(paramsFees).then(async (txFee) => {
        if (txFee) {
          await getTransactionApprove(paramsApprove).then(async (txApprove) => {
            const { data: { payload: payloadApprove = {} } = {} } = txApprove;
            payloadApprove.chainId = chainId;
            payloadApprove.from = currentAccount;
            await sendTransaction(payloadApprove).then(async () => {
              await getTransactionSwap(paramsSwap).then(async (txSwap) => {
                const { data: { payload: payloadSwap = {} } = {} } = txSwap;
                payloadSwap.chainId = chainId;
                await sendTransaction(payloadSwap).then(async () => {
                  setLoadingAll(false);
                  clearData();
                })
              });
            })
          });
        } else {
          setLoadingAll(false);
        }
      });
    } catch (error) {
      console.log(error)
      setLoadingAll(false);
    }
  }

  const callSwapTokenAvailable = async () => {
    try {
      const params = { chainId: currentNetwork.chainId };
      const response = await swapTokensAvailable(params);
      if (response && response.data && response.data.payload && response.data.payload.tokens && Object.values(response.data.payload.tokens).length) {
        const tokens = Object.values(response.data.payload.tokens);
        setAvailableSwapTokens(tokens);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const callQuotePrice = async () => {
    try {
      const amount = String(Number(ethers.utils.parseUnits(unit, selectFromToken.decimals)._hex));
      const params = { fromToken: selectFromToken, toToken: selectToToken, walletAddress: currentAccount, amount, chainId: currentNetwork.chainId };
      const response = await quotePrice(params);
      if (response && response.data && response.data.payload) {
        const payload = response.data.payload;
        const estimatedGas = payload.estimatedGas;
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const gasPrice = await provider.getGasPrice();
        const totalGas = Number(gasPrice._hex) * Number(estimatedGas);
        setQuote(payload);
        setTotalGas(totalGas);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async () => {
    callSwapToken();
  }

  const sortTokens = () => {
    let tokens = availableSwapTokens.length ? availableSwapTokens : []
    const keyword = tokenFilter.toLowerCase();
    if (tokenFilter && tokens.length) {
      let reg = new RegExp(keyword);
      tokens = tokens.filter(token => reg.test(token.symbol.toLowerCase()) || reg.test(token.name.toLowerCase()) || reg.test(token.address.toLowerCase()));
    }
    const sortTokens = tokens.sort((a, b) => a.address - b.address);
    return sortTokens
  }

  const disableConfirm = () => {
    return !selectFromToken || !selectToToken || !parseFloat(unit) > 0 || isLoading;
  }

  const isShowFee = () => {
    return selectFromToken && selectToToken && unit;
  }

  const setTokenWillReceive = () => {
    if (quote && quote.toTokenAmount && quote.toToken && quote.toToken.decimals) {
      const receive = String(ethers.utils.formatUnits(quote.toTokenAmount, quote.toToken.decimals));
      setTokenReceive(receive);
    }
  }

  const EstimateGas = () => {
    const chainId = currentNetwork.chainId;
    const gasBuffer = 3;
    return <div>Estimated Fee: {String(ethers.utils.formatUnits(String(totalGas * gasBuffer), getNetworkData(chainId).decimals))} {getNetworkData(chainId).currency}</div>;
  }

  const getNetworkData = (chainId) => {
    return NETWORKS_AVAILABLE.find(network => network.chainId === chainId);
  }


  const clearData = () => {
    setSelectType('');
    setSelectFromToken(null);
    setSelectToToken(null);
    setUnit('');
    setQuote({});
    setTotalGas(0);
    setTokenReceive('');
  }


  const memoTable = () => {
    return (
      <TableBody>
        {sortTokens().map((row) => (
          <TableRow
            key={row.address}
            sx={{ 'th': { border: 0 }, cursor: 'pointer', '&:hover': { background: 'rgba(201, 208, 231, 0.08)' } }}
            onClick={() => {
              if (selectType === 'from') {
                setSelectFromToken(row);
              } else if (selectType === 'to') {
                setSelectToToken(row);
              }
              setSelectType('')
              setTokenFilter('');
            }}
          >
            <TableCell component="th" scope="row">
              {row?.logoURI ? <Image src={row?.logoURI ? row.logoURI : ''} alt={row.name} height={60} width={60} /> : ''}
            </TableCell>
            <TableCell component="th" scope="row">
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'white' }}>{row.name}</Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'rgb(94, 104, 135)' }}>{row.symbol}</Typography>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  };

  const MemoizedTable = useMemo(
    () => memoTable(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [availableSwapTokens?.length, selectType, tokenFilter]
  );


  useEffect(() => {
    callSwapTokenAvailable();
    clearData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNetwork.chainId])


  useEffect(() => {
    if (!disableConfirm()) {
      callQuotePrice();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectFromToken?.address, selectToToken?.address, unit])

  useEffect(() => {
    setTokenWillReceive();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quote?.fromToken?.address, quote?.toToken?.address, quote?.fromTokenAmount, quote?.estimatedGas])

  return (
    <div className={style.wrapper} onClick={() => {
      setSelectType('');
      setTokenFilter('');
    }}>
      {
        !selectType ?
          <div className={style.content} onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}>
            <div className={style.formHeader}>
              <div>Swap</div>
              <div>
                <RiSettings3Fill />
              </div>
            </div>
            <div className={style.transferPropContainer}>
              <Input
                type='number'
                className={style.transferPropInput}
                placeholder='0.0'
                pattern='^[0-9]*[.,]?[0-9]*$'
                onChange={e => {
                  setUnit(e.target.value);
                }}
                value={unit}
              />
              <div className={style.currencySelector} onClick={() => {
                setSelectType('from');
              }}>
                <div className={style.currencySelectorContent}>
                  <div className={style.currencySelectorIcon}>
                    {selectFromToken ? <Image src={selectFromToken ? selectFromToken.logoURI : null} alt={selectFromToken ? selectFromToken.symbol : ''} height={20} width={20} /> : 'Select token'}
                  </div>
                  <div className={style.currencySelectorTicker}>{selectFromToken ? selectFromToken.symbol : ''}</div>
                  <AiOutlineDown className={style.currencySelectorArrow} />
                </div>
              </div>
            </div>
            <div className={style.transferPropContainer}>
              <Input
                type='number'
                className={style.transferPropInput}
                placeholder='0.0'
                disabled
                value={tokenReceive}
              />
              <div className={style.currencySelector} onClick={() => {
                setSelectType('to');
              }}>
                <div className={style.currencySelectorContent}>
                  <div className={style.currencySelectorIcon}>
                    {selectToToken ? <Image src={selectToToken ? selectToToken.logoURI : null} alt={selectToToken ? selectToToken.symbol : ''} height={20} width={20} /> : ' Select token'}
                  </div>
                  <div className={style.currencySelectorTicker}>{selectToToken ? selectToToken.symbol : ''}</div>
                  <AiOutlineDown className={style.currencySelectorArrow} />
                </div>
              </div>
            </div>
            <button onClick={e => handleSubmit(e)} className={style.confirmButton} disabled={disableConfirm()}>
              Confirm
            </button>
            {
              isShowFee() ? <EstimateGas /> : ''
            }
          </div>
          :
          <div className={style.content} onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}>
            <div className={style.formHeader}>
              <IoIosArrowBackIcon onClick={() => {
                setSelectType('');
                setTokenFilter('');
              }} />
              <SearchHeadWrapper>Select a token</SearchHeadWrapper>
            </div>
            <Paper
              component="form"
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', mt: '12px' }}
            >
              <IconButton sx={{ p: '10px' }} aria-label="menu">
                <SearchIcon />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search by name or paste address"
                inputProps={{ 'aria-label': 'search token name or address' }}
                onChange={(e) => {
                  setTokenFilter(e.target.value);
                }}
              />
              {/* <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
              </IconButton>
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                <DirectionsIcon />
              </IconButton> */}
            </Paper>
            <Divider />
            <TableContainer component={Paper}>
              <Table sx={{ maxWidth: '100%' }} aria-label="simple table">
                {MemoizedTable}
              </Table>
            </TableContainer>
          </div>
      }

      <Modal isOpen={!!router.query.loading} style={customStyles}>
        <TransactionLoader />
      </Modal>
    </div >
  )
}

export default Main;