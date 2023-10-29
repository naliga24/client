import axios from "../lib/axios";
import axiosLib from "axios";

import { coinmarketcap } from "../lib/coinMarketCap";

const getAllTokens = async () => {
  try {
    const response = await axios.get("/swap/getTopTokens", {
      validateStatus: function () {
        return true;
      },
    });
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getAllTokensCoinMarketCap = async () => {
  try {
    const response = await axiosLib.get(
      "https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        headers: {
          "X-CMC_PRO_API_KEY": coinmarketcap.key,
          Accepts: "application/json",
        },
      }
    );

    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getTokenMetadata = async () => {
  try {
    const response = await axios.get("/swap/getTokenMetadata", {
      validateStatus: function () {
        return true;
      },
    });
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const swapToken = async ({
  fromToken,
  toToken,
  walletAddress,
  amount,
  chainId,
  web3RpcUrl,
}) => {
  try {
    const response = await axios.post(
      "/swap/swapToken",
      {
        fromToken,
        toToken,
        walletAddress,
        amount,
        chainId,
        web3RpcUrl,
      },
      {
        validateStatus: function () {
          return true;
        },
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const swapTokensAvailable = async ({ chainId }) => {
  try {
    const response = await axios.get(
      `/swap/swapTokensAvailable?chainId=${chainId}`,
      {
        validateStatus: function () {
          return true;
        },
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const quotePrice = async ({
  fromToken,
  toToken,
  walletAddress,
  amount,
  chainId,
  fee,
  slippage,
  allowPartialFill,
}) => {
  try {
    const response = await axios.post(
      "/swap/quotePrice",
      {
        fromToken,
        toToken,
        walletAddress,
        amount,
        chainId,
        fee,
        slippage,
        allowPartialFill,
      },
      {
        validateStatus: function () {
          return true;
        },
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getTransactionApprove = async ({
  fromToken,
  walletAddress,
  amount,
  chainId,
  web3RpcUrl,
}) => {
  try {
    const response = await axios.post(
      "/swap/getTransactionApprove",
      {
        fromToken,
        walletAddress,
        amount,
        chainId,
        web3RpcUrl,
      },
      {
        validateStatus: function () {
          return true;
        },
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getTransactionSwap = async ({
  fromToken,
  toToken,
  walletAddress,
  destReceiver,
  amount,
  chainId,
  referrerAddress,
  fee,
  slippage,
  allowPartialFill,
}) => {
  try {
    const response = await axios.post(
      "/swap/getTransactionSwap",
      {
        fromToken,
        toToken,
        walletAddress,
        destReceiver,
        amount,
        chainId,
        referrerAddress,
        fee,
        slippage,
        allowPartialFill,
      },
      {
        validateStatus: function () {
          return true;
        },
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const healthCheck = async ({ chainId }) => {
  try {
    const response = await axios.get(`/swap/healthcheck?chainId=${chainId}`, {
      validateStatus: function () {
        return true;
      },
    });
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export {
  getAllTokens,
  getAllTokensCoinMarketCap,
  getTokenMetadata,
  swapToken,
  swapTokensAvailable,
  quotePrice,
  getTransactionApprove,
  getTransactionSwap,
  healthCheck,
};
