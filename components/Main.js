import Image from 'next/image'
import Head from 'next/head';
import { RiSettings3Fill } from 'react-icons/ri'
import { AiOutlineDown } from 'react-icons/ai'
import React, { useContext, useEffect, useState, useMemo } from 'react'
import { TransactionContext } from '../context/TransactionContext'
import Modal from 'react-modal'
import { ethers } from "ethers";
// import { v4 as uuidv4 } from 'uuid';
import { useWeb3React } from '@web3-react/core';
import { useRouter } from 'next/router'
import TransactionLoader from './TransactionLoader'
import {
  swapTokensAvailable,
  quotePrice,
  getTransactionApprove,
  getTransactionSwap,
  healthCheck,
} from '../api/token';
import { PLATFORM_OWNER, PLATFORM_FEE, getNetworkData} from '../utils/constants'
import SearchIcon from '@mui/icons-material/Search';
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import {
  getAccount,
  getNetwork,
  setSwapAvailableTokens,
} from "../redux/slices/authenticate";
import {
  openWalletModal,
} from "../redux/slices/ui";

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
  AlertStyled,
  Avatar,
} from "./main.style"


Modal.setAppElement('#__next')

const style = {
  wrapper: `w-screen flex items-center justify-center mt-14 z-10`,
  content: `bg-[#191B1F] w-[30rem] rounded-2xl p-4 z-0`,
  formHeader: `px-2 flex items-center justify-between font-semibold sm:text-base md:text-md`,
  transferPropContainer: `bg-[#20242A] my-3 rounded-2xl p-6 border border-[#20242A] hover:border-[#41444F] flex justify-between`,
  transferPropInput: `bg-transparent placeholder:text-[#B2B9D2] outline-none mb-6 w-full sm:text-base md:text-xl`,
  currencySelector: `flex`,
  currencySelectorContent: `w-max w-full h-min flex justify-between items-center bg-[#2D2F36] hover:bg-[#41444F] rounded-2xl sm:text-base md:text-lg font-medium cursor-pointer p-2 mt-[-0.2rem]`,
  currencySelectorIcon: `w-max flex items-center`,
  currencySelectorTicker: `mx-2`,
  currencySelectorArrow: `text-lg`,
  confirmButton: `bg-[#2172E5] my-2 rounded-2xl py-6 px-8 sm:text-base md:text-lg font-semibold flex items-center justify-center !disabled:cursor-pointer !disabled:border-[#2172E5] !disabled:hover:border-[#234169] w-full disabled:bg-[#20242A] disabled:text-gray-400`,
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
  const [sendToAddress, setSendToAddress] = useState('');
  const [isSendToAddressCorrect, setIsSendToAddressCorrect] = useState(true);
  const [isDisableConfirm, setIsDisableConfirm] = useState(true);
  const [apiHealthCheck, setApiHealthCheck] = useState(true);
  //const [uuid, setUuid] = useState(uuidv4());

  const currentAccount = useAppSelector(getAccount);
  const currentNetwork = useAppSelector(getNetwork)
  const dispatchStore = useAppDispatch();

  const { provider } = useWeb3React();

  const {
    sendTransaction,
    setIsLoading,
    isLoading,
  } =
    useContext(TransactionContext)
  const router = useRouter()

  const setLoadingAll = (loading) => {
    setIsLoading(loading);
  }


  const callSwapToken = async () => {
    try {
      if(!currentAccount){
        dispatchStore(openWalletModal());
        return;
      }
      setLoadingAll(true);
      const amount = String(Number(ethers.utils.parseUnits(unit, selectFromToken.decimals)._hex))
      const chainId = currentNetwork.chainId;
      const web3RpcUrl = getNetworkData(chainId);
      const paramsApprove = { fromToken: selectFromToken, walletAddress: currentAccount, amount, chainId, web3RpcUrl };
      const paramsSwap = { fromToken: selectFromToken, toToken: selectToToken, walletAddress: currentAccount, destReceiver: sendToAddress || currentAccount,  amount, chainId, web3RpcUrl, referrerAddress: PLATFORM_OWNER, fee: PLATFORM_FEE };

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
    } catch (error) {
      console.log("callSwapToken:",error)
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
        dispatchStore(setSwapAvailableTokens(tokens));
      }
    } catch (error) {
      console.log(error)
    }
  }

  const callQuotePrice = async () => {
    try {
      const amount = String(Number(ethers.utils.parseUnits(unit, selectFromToken.decimals)._hex));
      const params = { fromToken: selectFromToken, toToken: selectToToken, walletAddress: currentAccount, amount, chainId: currentNetwork.chainId, fee: PLATFORM_FEE };
      const response = await quotePrice(params);
      if (response && response.data && response.data.payload) {
        const payload = response.data.payload;
        const estimatedGas = payload.estimatedGas;
        const gasPrice = await provider.getGasPrice();
        const totalGas = Number(gasPrice._hex) * Number(estimatedGas);
        setQuote(payload);
        setTotalGas(totalGas);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const callHealthCheck = async () => {
    try {
      const params = { chainId: currentNetwork.chainId};
      const response = await healthCheck(params);
      const isGoodHealth = response && response?.data && response?.data?.code && response?.data?.code === 200;
      setApiHealthCheck(isGoodHealth);
      console.log("callHealthCheck=>", isGoodHealth);
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async () => {
    callSwapToken();
  }

  const tokens = () => {
    let tokens = availableSwapTokens.length ? availableSwapTokens : [];
    const keyword = tokenFilter.toLowerCase();
    if (tokenFilter && tokens?.length) {
      let reg = new RegExp(keyword);
      tokens = tokens.filter(token => reg.test(token.symbol.toLowerCase()) || reg.test(token.name.toLowerCase()) || reg.test(token.address.toLowerCase()));
    }
    return tokens;
  }

  const isShowFee = () => {
    const isUnit = parseFloat(unit) > 0;
    return selectFromToken && selectToToken && isUnit && tokenReceive;
  }

  const setTokenWillReceive = () => {
    if (quote && quote.toTokenAmount && quote.toToken && quote.toToken.decimals) {
      const receive = ethers.utils.formatUnits(quote.toTokenAmount, quote.toToken.decimals);
      setTokenReceive(receive);
    } else {
      setTokenReceive('');
    }
  }

  const EstimateGas = () => {
    const chainId = currentNetwork.chainId;
    const gasBuffer = 1;
    return <div>Estimated Fee: {ethers.utils.formatUnits(String(totalGas * gasBuffer), getNetworkData(chainId).decimals)} {getNetworkData(chainId).currency}</div>;
  }

  const clearData = () => {
    setSelectType('');
    setSelectFromToken(null);
    setSelectToToken(null);
    setUnit('');
    setQuote({});
    setTotalGas(0);
    setTokenReceive('');
    setSendToAddress('');
    setIsSendToAddressCorrect(true);
  }


  const memoTable = () => {
    return (
      <TableBody>
        {tokens().map((row) => (
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
              {/* {row?.logoURI ? 
              <Image 
              src={row?.logoURI ? row.logoURI : ''} 
              alt={row.name} 
              height={60} 
              width={60} 
              /> : ''} */}
               <Avatar alt={row?.name} src={row?.logoURI}>
                {!row?.logoURI && row?.symbol?.charAt(0)?.toUpperCase()}
              </Avatar>
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
     let interval;
      if (!isDisableConfirm) {
        callQuotePrice();
         interval =  setInterval(() => {
          callQuotePrice();
        }, 8000);
      } else {
        clearInterval(interval)
      }
      return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectFromToken?.address, selectToToken?.address, unit, isDisableConfirm])

  useEffect(() => {
    setTokenWillReceive();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit, quote?.fromToken?.address, quote?.toToken?.address, quote?.fromTokenAmount, quote?.estimatedGas])

  useEffect(() => {
    const disabled = !selectFromToken?.address || !selectToToken?.address || !(parseFloat(unit) > 0) || isLoading || !isSendToAddressCorrect;
    setIsDisableConfirm(disabled);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectFromToken?.address, selectToToken?.address, unit, isLoading, isSendToAddressCorrect])

  useEffect(() => {
    const isUnit = parseFloat(unit) > 0;
    if(!isUnit) {
      setTokenReceive('');
      setQuote({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit])

  useEffect(() => {
    callHealthCheck();
  },[])

  const head = {
    title: "3ether.io | DEX",
  }

  return (
    <>
    <Head> 
    <title>{head.title}</title>
  </Head>
    <div 
    className={style.wrapper} 
    onClick={() => {
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
            <div className={style.transferPropContainer}>
              <Input
                type='text'
                className={style.transferPropInput}
                placeholder='Receiver address 0x...'
                onChange={e => {
                 const value = e.target.value;
                 const isCorrectAddress = ethers.utils.isAddress(value);
                  setSendToAddress(value);
                  setIsSendToAddressCorrect(value ? isCorrectAddress: true);
                }}
                value={sendToAddress}
              />
            </div>
            <button onClick={e => handleSubmit(e)} className={style.confirmButton} disabled={isDisableConfirm}>
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
                autoFocus
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search by name or address"
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
    {
      !apiHealthCheck && <AlertStyled 
      severity="error" 
      onClose={() => setApiHealthCheck(true)}
      >Opps!<br/>We found a problem with an API.<br/>Try to connect with your wallet or reload the page.<br/>If the issue still persists, check your internet connection.
      </AlertStyled>
    }
    </>
    
  )
}

export default Main;