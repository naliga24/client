import Image from "next/image";
import Head from "next/head";
import { withTheme } from "styled-components";
import { RiSettings3Fill } from "react-icons/ri";
import { AiOutlineDown } from "react-icons/ai";
import React, { useContext, useEffect, useState, useMemo } from "react";
import { TransactionContext } from "../context/TransactionContext";
import Modal from "react-modal";
import { ethers } from "ethers";
// import { v4 as uuidv4 } from 'uuid';
import { useWeb3React } from "@web3-react/core";
import { useRouter } from "next/router";
import { isMobile } from "../utils/userAgent";
import TransactionLoader from "./TransactionLoader";
import {
  swapTokensAvailable,
  quotePrice,
  getTransactionApprove,
  getTransactionSwap,
  healthCheck,
} from "../api/swap";
import { getTokenByAddress } from "../api/token";
import {
  PLATFORM_OWNER,
  PLATFORM_FEE,
  getNetworkData,
} from "../utils/constants";
import SearchIcon from "@mui/icons-material/Search";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import {
  getAccount,
  getNetwork,
  setSwapAvailableTokens,
  getAllUserTokens,
} from "../redux/slices/authenticate";
import { openWalletModal } from "../redux/slices/ui";
import {
  setSlippage,
  setCustomSlippage,
  setIsCustomSlippage,
  setIsPartialFill,
  getSlippage,
  getCustomSlippage,
  getIsCustomSlippage,
  getIsPartialFill,
} from "../redux/slices/settings";

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
  // AlertStyled,
  Avatar,
  InputGroup,
  BalanceMaxGroup,
  Button,
  TypographyGray,
  InputRow,
  SendToIconWrapper,
  ExpandMoreIcon,
  SendToInputWrapper,
  ConfirmButton,
  StyledRadio,
  StyledRadioGroup,
  StyledFormControlLabel,
  StyledFormControl,
  StyledFormLabel,
  StyledBox,
  StyledSlider,
  StyledFormHelperText,
  CustomSlippageContainer,
  StyledSwitch,
} from "./main.style";

Modal.setAppElement("#__next");

const style = {
  wrapper: `w-screen flex items-center justify-center mt-14 max-sm:mt-0 z-10`,
  content: `bg-[#1a1a1a] w-[33rem] rounded-2xl p-4 z-0`,
  formHeader: `px-2 flex items-center justify-between font-semibold sm:text-base md:text-md`,
  transferPropContainer: `bg-[#20242A] my-3 rounded-2xl p-6 border border-[#20242A] hover:border-[#41444F] flex justify-between flex-col`,
  transferPropInput: `bg-transparent placeholder:text-[#B2B9D2] outline-none mb-6 w-full sm:text-base md:text-xl text-ellipsis`,
  currencySelector: `flex`,
  currencySelectorContent: `w-max w-full h-min flex justify-between items-center bg-[#2D2F36] hover:bg-[#41444F] rounded-2xl sm:text-base md:text-lg font-normal cursor-pointer px-4 py-2 mt-[-0.2rem]`,
  currencySelectorIcon: `w-max flex items-center`,
  currencySelectorTicker: `mx-2`,
  currencySelectorArrow: `text-lg`,
  confirmButton: `my-2 rounded-2xl py-6 px-8 sm:text-base md:text-lg font-semibold flex items-center justify-center !disabled:cursor-pointer w-full shadow-md hover:from-blue-600 hover:to-blue-800 disabled:bg-[#20242A] disabled:text-gray-400`,
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#0a0b0d",
    padding: 0,
    border: "none",
  },
  overlay: {
    backgroundColor: "rgba(10, 11, 13, 0.75)",
  },
};

const Main = () => {
  const [selectType, setSelectType] = useState("");
  const [availableSwapTokens, setAvailableSwapTokens] = useState([]);
  const [tokenFilter, setTokenFilter] = useState("");
  const [selectFromToken, setSelectFromToken] = useState(null);
  const [selectToToken, setSelectToToken] = useState(null);
  const [unit, setUnit] = useState("");
  const [quote, setQuote] = useState({});
  const [totalGas, setTotalGas] = useState(0);
  const [tokenReceive, setTokenReceive] = useState("");
  const [sendToAddress, setSendToAddress] = useState("");
  const [isSendToAddressCorrect, setIsSendToAddressCorrect] = useState(true);
  const [isDisableConfirm, setIsDisableConfirm] = useState(true);
  // const [apiHealthCheck, setApiHealthCheck] = useState(true);
  const [, setTxApproveHash] = useState("");
  const [, setTxSwapHash] = useState("");
  const [showSendTo, setShowSendTo] = useState(false);
  //const [uuid, setUuid] = useState(uuidv4());

  const currentAccount = useAppSelector(getAccount);
  const currentNetwork = useAppSelector(getNetwork);
  const allUserTokens = useAppSelector(getAllUserTokens);
  const slippage = useAppSelector(getSlippage);
  const customSlippage = useAppSelector(getCustomSlippage);
  const isCustomSlippage = useAppSelector(getIsCustomSlippage);
  const isPartialFill = useAppSelector(getIsPartialFill);
  const dispatchStore = useAppDispatch();

  // eslint-disable-next-line
  const { provider, account } = useWeb3React();

  const { sendTransaction, setIsLoading, isLoading } =
    useContext(TransactionContext);
  const router = useRouter();

  const setLoadingAll = (loading) => {
    setIsLoading(loading);
  };

  const callSwapToken = async () => {
    try {
      if (!account) {
        dispatchStore(openWalletModal());
        return;
      }
      setLoadingAll(true);
      const amount = String(
        Number(ethers.utils.parseUnits(unit, selectFromToken.decimals)._hex)
      );
      const chainId = currentNetwork.chainId;
      const web3RpcUrl = getNetworkData(chainId);
      const slippageValue = isCustomSlippage ? customSlippage : slippage;
      const paramsApprove = {
        fromToken: selectFromToken,
        walletAddress: currentAccount,
        amount,
        chainId,
        web3RpcUrl,
      };
      const paramsSwap = {
        fromToken: selectFromToken,
        toToken: selectToToken,
        walletAddress: currentAccount,
        destReceiver: sendToAddress || currentAccount,
        amount,
        chainId,
        web3RpcUrl,
        referrerAddress: PLATFORM_OWNER,
        fee: PLATFORM_FEE,
        slippage: slippageValue,
        allowPartialFill: isPartialFill,
      };

      // console.log("slippage=>", isPartialFill);
      // return;

      await getTransactionApprove(paramsApprove).then(async (txApprove) => {
        const { data: { payload: payloadApprove = {} } = {} } = txApprove;
        if (!payloadApprove?.error) {
          payloadApprove.chainId = chainId;
          payloadApprove.from = currentAccount;
          console.log("txApprove=>", txApprove);
          await sendTransaction(payloadApprove, "approve").then(
            async (txApproveHash) => {
              setTxApproveHash(txApproveHash);
              await getTransactionSwap(paramsSwap).then(async (txSwap) => {
                console.log("txSwap=>", txSwap);
                const { data: { payload: payloadSwap = {} } = {} } = txSwap;
                if (!payloadSwap?.error) {
                  payloadSwap.chainId = chainId;
                  await sendTransaction(payloadSwap, "swap").then(
                    async (txSwapHash) => {
                      setTxSwapHash(txSwapHash);
                      setLoadingAll(false);
                      clearData();
                    }
                  );
                } else {
                  setLoadingAll(false);
                  alert(
                    "Sorry got an error for swap transaction, Please try again."
                  );
                }
              });
            }
          );
        } else {
          setLoadingAll(false);
          alert(
            "Sorry got an error for approval transaction, Please try again."
          );
        }
      });
    } catch (error) {
      console.log("callSwapToken:", error);
      setLoadingAll(false);
    }
  };

  const callSwapTokenAvailable = async () => {
    try {
      const params = { chainId: currentNetwork?.chainId };
      const response = await swapTokensAvailable(params);
      if (
        response?.data?.payload?.tokens &&
        Object.values(response.data.payload.tokens)?.length
      ) {
        const tokens = Object.values(response.data.payload.tokens);
        setAvailableSwapTokens(tokens);
        dispatchStore(setSwapAvailableTokens(tokens));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const callQuotePrice = async () => {
    try {
      const amount = String(
        Number(ethers.utils.parseUnits(unit, selectFromToken?.decimals)?._hex)
      );
      const slippageValue = isCustomSlippage ? customSlippage : slippage;
      const params = {
        fromToken: selectFromToken,
        toToken: selectToToken,
        walletAddress: currentAccount,
        amount,
        chainId: currentNetwork.chainId,
        fee: PLATFORM_FEE,
        slippage: slippageValue,
        allowPartialFill: isPartialFill,
      };
      const response = await quotePrice(params);
      if (response?.data?.payload) {
        const payload = response.data.payload;
        // const estimatedGas = payload.estimatedGas;
        //const gasPrice = await provider.getGasPrice();
        // const totalGas = Number(gasPrice._hex) * Number(estimatedGas);
        setQuote(payload);
        // setTotalGas(totalGas);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const callGetTokenByAddress = async (address) => {
    try {
      const params = { chainId: currentNetwork.chainId, address };
      const response = await getTokenByAddress(params);
      console.log("callGetTokenByAddress=>", response);
      return response?.data?.payload;
    } catch (error) {
      console.log(error);
    }
  };

  // eslint-disable-next-line
  const callHealthCheck = async () => {
    try {
      const params = { chainId: currentNetwork.chainId };
      const response = await healthCheck(params);
      const isGoodHealth =
        response &&
        response?.data &&
        response?.data?.code &&
        response?.data?.code === 200;
      // setApiHealthCheck(isGoodHealth);
      console.log("callHealthCheck=>", isGoodHealth);
    } catch (error) {
      console.log(error);
      // setApiHealthCheck(false);
    }
  };

  const handleSubmit = async () => {
    callSwapToken();
  };

  const tokens = () => {
    let tokens = availableSwapTokens.length ? availableSwapTokens : [];
    const keyword = tokenFilter.toLowerCase();
    if (tokenFilter && tokens?.length) {
      let reg = new RegExp(keyword);
      tokens = tokens.filter(
        (token) =>
          reg.test(token.symbol.toLowerCase()) ||
          reg.test(token.name.toLowerCase()) ||
          reg.test(token.address.toLowerCase())
      );
    }
    return tokens;
  };

  const isShowFee = () => {
    const isUnit = parseFloat(unit) > 0;
    return selectFromToken && selectToToken && isUnit && tokenReceive;
  };

  const setTokenWillReceive = () => {
    if (quote && quote.toAmount) {
      const receive = ethers.utils.formatUnits(
        quote.toAmount,
        selectToToken.decimals
      );
      setTokenReceive(receive);
    } else {
      setTokenReceive("");
    }
  };

  const getGasFormatted = (gasBuffer = 1) => {
    const chainId = currentNetwork.chainId;
    const decimals = getNetworkData(chainId)?.decimals;
    const gasFormatted = ethers.utils.formatUnits(
      String(totalGas * gasBuffer),
      decimals
    );
    return gasFormatted;
  };

  const EstimateGas = () => {
    const chainId = currentNetwork.chainId;
    const gas = getGasFormatted();
    const currency = getNetworkData(chainId)?.currency;
    return (
      <TypographyGray px={3} py={2}>
        Network Fee: {gas} {currency}
      </TypographyGray>
    );
  };

  const setMaxTokeTradeBalance = () => {
    const unit = getFromTokenBalance()?.balance?.formatted || 0;
    setUnit(unit);
  };

  const getFromTokenBalance = () => {
    if (!selectFromToken) return;
    const tokenBalance = allUserTokens.find(
      (userToken) => userToken?.symbol === selectFromToken?.symbol
    );
    return tokenBalance;
  };

  const getToTokenBalance = () => {
    if (!selectToToken) return;
    const tokenBalance = allUserTokens.find(
      (userToken) => userToken?.symbol === selectToToken?.symbol
    );
    return tokenBalance;
  };

  const clearData = () => {
    setSelectType("");
    setSelectFromToken(null);
    setSelectToToken(null);
    setUnit("");
    setQuote({});
    setTotalGas(0);
    setTokenReceive("");
    setSendToAddress("");
    setIsSendToAddressCorrect(true);
  };

  const memoTable = () => {
    return (
      <TableBody>
        {tokens().map((row) => (
          <TableRow
            key={row.address}
            sx={{
              th: { border: 0 },
              cursor: "pointer",
              "&:hover": { background: "rgba(201, 208, 231, 0.08)" },
            }}
            onClick={() => {
              if (selectType === "from") {
                setSelectFromToken(row);
                //setUnit('');
              } else if (selectType === "to") {
                setSelectToToken(row);
              }
              setSelectType("");
              setTokenFilter("");
            }}
          >
            <TableCell component="th" scope="row">
              <Avatar alt={row?.name} src={row?.logoURI}>
                {!row?.logoURI && row?.symbol?.charAt(0)?.toUpperCase()}
              </Avatar>
            </TableCell>
            <TableCell component="th" scope="row">
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, color: "white" }}
              >
                {row.name}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, color: "rgb(94, 104, 135)" }}
              >
                {row.symbol}
              </Typography>
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

  const slippageCustomLabelFormat = (value) => {
    const unit = "%";
    return `${value} ${unit}`;
  };

  useEffect(() => {
    callSwapTokenAvailable();
    clearData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNetwork.chainId]);

  useEffect(() => {
    let interval;
    if (!isDisableConfirm) {
      callQuotePrice();
      interval = setInterval(() => {
        callQuotePrice();
      }, 60000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectFromToken?.address,
    selectToToken?.address,
    unit,
    isDisableConfirm,
  ]);

  useEffect(() => {
    // eslint-disable-next-line
    const token = async () => {
      if (quote?.toAmount) {
        const response = await callGetTokenByAddress(selectToToken?.address);
        console.log("callGetTokenByAddress=>", response, selectToToken);
      }
    };
    // token();
    setTokenWillReceive();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    //  }, [unit, quote?.fromToken?.address, quote?.toToken?.address, quote?.fromTokenAmount, quote?.estimatedGas])
  }, [unit, quote?.toAmount]);

  useEffect(() => {
    const disabled =
      !selectFromToken?.address ||
      !selectToToken?.address ||
      selectFromToken?.address === selectToToken?.address ||
      !(parseFloat(unit) > 0) ||
      isLoading ||
      !isSendToAddressCorrect;
    setIsDisableConfirm(disabled);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectFromToken?.address,
    selectToToken?.address,
    unit,
    isLoading,
    isSendToAddressCorrect,
  ]);

  useEffect(() => {
    const isUnit = parseFloat(unit) > 0;
    if (!isUnit) {
      setTokenReceive("");
      setQuote({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit]);

  useEffect(() => {
    //callHealthCheck();
  }, []);

  const updateUnitForNativeFromToken = () => {
    const isFromTokenNative = getFromTokenBalance();
    const gasFormatted = getGasFormatted(1.5);
    const unitDeductGas = String(
      parseFloat(isFromTokenNative?.balance?.formatted) -
        parseFloat(gasFormatted)
    );
    setUnit(unitDeductGas);
  };

  const SlippageWarning = () => {
    const slippageValue = isCustomSlippage ? customSlippage : slippage;
    let warningMessage = "";
    if (slippageValue < 0.38) {
      warningMessage = (
        <StyledFormHelperText>
          Transaction might be reverted because of low slippage tolerance.
        </StyledFormHelperText>
      );
    } else if (slippageValue > 0.62) {
      warningMessage = (
        <StyledFormHelperText>
          Transaction might be frontrun because of high slippage tolerance.
        </StyledFormHelperText>
      );
    }
    return warningMessage;
  };

  const CustomSlippage = () => {
    return (
      <CustomSlippageContainer>
        <Typography>Custom</Typography>
        <StyledBox sx={{ width: "100%" }}>
          <StyledSlider
            disabled={!isCustomSlippage}
            min={0.001}
            max={49.999}
            defaultValue={customSlippage}
            step={0.001}
            aria-label="Default"
            valueLabelDisplay="auto"
            getAriaValueText={slippageCustomLabelFormat}
            valueLabelFormat={slippageCustomLabelFormat}
            onChangeCommitted={(_, value) => {
              const slippageValue = value;
              dispatchStore(setCustomSlippage(slippageValue));
            }}
          />
        </StyledBox>
      </CustomSlippageContainer>
    );
  };

  const resetSettings = () => {
    dispatchStore(setSlippage(0.5));
    dispatchStore(setCustomSlippage(1.001));
    dispatchStore(setIsCustomSlippage(false));
    dispatchStore(setIsPartialFill(true));
  };

  const defaultPage = () => {
    return (
      <div
        className={style.content}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div className={style.formHeader}>
          <div>Swap</div>
          <button>
            <RiSettings3Fill
              onClick={() => {
                setSelectType("setting");
              }}
            />
          </button>
        </div>
        <InputRow className={style.transferPropContainer}>
          <TypographyGray>You sell</TypographyGray>
          <InputGroup>
            <Input
              type="number"
              className={style.transferPropInput}
              placeholder="0.0"
              pattern="^[0-9]*[.,]?[0-9]*$"
              onChange={(e) => {
                setUnit(e.target.value);
              }}
              value={unit}
            />
            <div
              className={style.currencySelector}
              onClick={() => {
                setSelectType("from");
              }}
            >
              <div className={style.currencySelectorContent}>
                <div className={style.currencySelectorIcon}>
                  {selectFromToken ? (
                    <Image
                      src={selectFromToken ? selectFromToken.logoURI : null}
                      alt={
                        selectFromToken
                          ? selectFromToken.symbol
                          : "no token selected"
                      }
                      height={20}
                      width={20}
                    />
                  ) : (
                    "Select token"
                  )}
                </div>
                <div className={style.currencySelectorTicker}>
                  {selectFromToken ? selectFromToken.symbol : ""}
                </div>
                <AiOutlineDown className={style.currencySelectorArrow} />
              </div>
            </div>
          </InputGroup>
          <BalanceMaxGroup>
            {selectFromToken && (
              <TypographyGray>
                Balance: {getFromTokenBalance()?.balance?.formatted || 0}
              </TypographyGray>
            )}
            {selectFromToken && getFromTokenBalance() && (
              <Button onClick={setMaxTokeTradeBalance}>Max</Button>
            )}
          </BalanceMaxGroup>
        </InputRow>
        <InputRow className={style.transferPropContainer}>
          <TypographyGray>You buy</TypographyGray>
          <InputGroup>
            <Input
              type="number"
              className={style.transferPropInput}
              placeholder="0.0"
              disabled
              value={tokenReceive}
            />
            <div
              className={style.currencySelector}
              onClick={() => {
                setSelectType("to");
              }}
            >
              <div className={style.currencySelectorContent}>
                <div className={style.currencySelectorIcon}>
                  {selectToToken ? (
                    <Image
                      src={selectToToken ? selectToToken.logoURI : null}
                      alt={selectToToken ? selectToToken.symbol : ""}
                      height={20}
                      width={20}
                    />
                  ) : (
                    " Select token"
                  )}
                </div>
                <div className={style.currencySelectorTicker}>
                  {selectToToken ? selectToToken.symbol : ""}
                </div>
                <AiOutlineDown className={style.currencySelectorArrow} />
              </div>
            </div>
          </InputGroup>
          <BalanceMaxGroup>
            {selectToToken && (
              <TypographyGray>
                Balance: {getToTokenBalance()?.balance?.formatted || 0}
              </TypographyGray>
            )}
          </BalanceMaxGroup>
        </InputRow>
        <SendToIconWrapper>
          <ExpandMoreIcon
            $isOpen={showSendTo}
            onClick={() => setShowSendTo(!showSendTo)}
          />
        </SendToIconWrapper>
        <SendToInputWrapper
          className={`${
            showSendTo
              ? `active ${style.transferPropContainer}`
              : `inactive ${style.transferPropContainer}`
          }`}
        >
          <Input
            type="text"
            className={`${style.transferPropInput} !mb-0`}
            placeholder="receiver address 0x..."
            onChange={(e) => {
              const value = e.target.value;
              const isCorrectAddress = ethers.utils.isAddress(value);
              setSendToAddress(value);
              setIsSendToAddressCorrect(value ? isCorrectAddress : true);
            }}
            value={sendToAddress}
          />
        </SendToInputWrapper>
        {isShowFee() ? <EstimateGas /> : ""}
        <ConfirmButton
          onClick={(e) => handleSubmit(e)}
          className={`${
            !isDisableConfirm
              ? "bg-gradient-to-b from-blue-500 to-blue-900 shadow-md hover:from-blue-600 hover:to-blue-800"
              : ""
          }${style.confirmButton}`}
          disabled={isDisableConfirm}
        >
          Confirm
        </ConfirmButton>
      </div>
    );
  };

  const selectToken = () => {
    return (
      <div
        className={style.content}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div className={style.formHeader}>
          <IoIosArrowBackIcon
            onClick={() => {
              setSelectType("");
              setTokenFilter("");
            }}
          />
          <SearchHeadWrapper>Select a token</SearchHeadWrapper>
        </div>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
            mt: "12px",
            borderRadius: "1rem",
          }}
        >
          <IconButton sx={{ p: "10px" }} aria-label="menu">
            <SearchIcon />
          </IconButton>
          <InputBase
            autoFocus={!isMobile}
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search by name or address"
            inputProps={{ "aria-label": "search token name or address" }}
            onChange={(e) => {
              setTokenFilter(e.target.value);
            }}
          />
        </Paper>
        <Divider />
        <TableContainer>
          <Table sx={{ maxWidth: "100%" }} aria-label="simple table">
            {MemoizedTable}
          </Table>
        </TableContainer>
      </div>
    );
  };

  const settings = () => {
    return (
      <div
        className={style.content}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={style.formHeader}>
          <IoIosArrowBackIcon
            onClick={() => {
              setSelectType("");
            }}
          />
          <SearchHeadWrapper>Swap settings</SearchHeadWrapper>
          <Typography
            onClick={resetSettings}
            variant="subtitle2"
            sx={{ cursor: "pointer" }}
          >
            Reset
          </Typography>
        </div>
        <InputRow className={`${style.transferPropContainer} gap-3`}>
          <StyledFormControl>
            <StyledFormLabel>Slippage tolerance</StyledFormLabel>
            <StyledRadioGroup
              aria-labelledby="slippage-tolerance-buttons-group-label"
              value={slippage}
              onChange={(e) => {
                if (e.target.value === "custom") {
                  dispatchStore(setIsCustomSlippage(true));
                  dispatchStore(setSlippage(e.target.value));
                } else {
                  const slippageValue = parseFloat(e.target.value);
                  dispatchStore(setIsCustomSlippage(false));
                  dispatchStore(setSlippage(slippageValue));
                }
              }}
            >
              <StyledFormControlLabel
                value={0.1}
                control={<StyledRadio />}
                label="0.1%"
              />
              <StyledFormControlLabel
                value={0.5}
                control={<StyledRadio />}
                label="0.5%"
              />
              <StyledFormControlLabel
                value={1}
                control={<StyledRadio />}
                label="1%"
              />
              <StyledFormControlLabel
                value={"custom"}
                control={<StyledRadio />}
                label={isCustomSlippage ? <CustomSlippage /> : "Custom"}
              />
            </StyledRadioGroup>
            <SlippageWarning />
          </StyledFormControl>

          <StyledFormControl>
            <StyledFormLabel id="allow-partial-fill-label">
              Partial fill
            </StyledFormLabel>
            <StyledFormControlLabel
              control={
                <StyledSwitch
                  checked={isPartialFill}
                  onChange={(e) => {
                    const isPartialFillValue = e.target.checked;
                    dispatchStore(setIsPartialFill(isPartialFillValue));
                  }}
                />
              }
              label={isPartialFill ? "On" : "Off"}
            />
          </StyledFormControl>
        </InputRow>
      </div>
    );
  };

  useEffect(() => {
    const isFromTokenNative = getFromTokenBalance();
    const gasFormatted = getGasFormatted(1.5);
    const isNotEnoughtFunds =
      parseFloat(unit) >
      parseFloat(isFromTokenNative?.balance?.formatted) -
        parseFloat(gasFormatted);
    if (
      Object.keys(quote)?.length &&
      isFromTokenNative?.isNativeToken &&
      isNotEnoughtFunds
    ) {
      updateUnitForNativeFromToken();
    }
  }, [unit, quote?.estimatedGas, quote?.fromToken?.address]);

  const head = {
    title: "3EtHeR.io | DEX",
  };

  return (
    <>
      <Head>
        <title>{head.title}</title>
      </Head>
      <div
        className={style.wrapper}
        onClick={() => {
          setSelectType("");
          setTokenFilter("");
        }}
      >
        {!selectType
          ? defaultPage()
          : selectType === "from" || selectType === "to"
          ? selectToken()
          : settings()}

        <Modal isOpen={!!router.query.loading} style={customStyles}>
          <TransactionLoader />
        </Modal>
      </div>
      {/* {
      !apiHealthCheck && <AlertStyled 
      severity="error" 
      onClose={() => {
        console.log("onClose=>");
        setApiHealthCheck(true)}
      }
      >Opps!<br/>We found a problem with an API.<br/>Try to connect with your wallet or reload the page.<br/>If the issue still persists, check your internet connection.
      </AlertStyled>
    } */}
    </>
  );
};

export default withTheme(Main);
