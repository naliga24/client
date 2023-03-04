import axios from "../lib/axios";
import axiosLib from "axios";

import { coinmarketcap } from "../lib/coinMarketCap";

const getAllTokens = async () => {
  try {
    const response = await axios.get(
      "/token/getTopTokens",
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

const getAllTokensCoinMarketCap = async () => {
  try {
    const response = await axiosLib.get('https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
      headers: {
        'X-CMC_PRO_API_KEY': coinmarketcap.key,
        'Accepts': 'application/json',
      },
    });

    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getTokenMetadata = async () => {
  try {
    const response = await axios.get(
      "/token/getTokenMetadata",
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

const swapToken = async ({ fromToken, toToken, walletAddress, amount, chainId, web3RpcUrl }) => {
  try {
    const response = await axios.post(
      "/token/swapToken", {
      fromToken, toToken, walletAddress, amount, chainId, web3RpcUrl
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
      `/token/swapTokensAvailable?chainId=${chainId}`,
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

const quotePrice = async ({ fromToken, toToken, walletAddress, amount, chainId }) => {
  try {
    const response = await axios.post(
      '/token/quotePrice', {
      fromToken, toToken, walletAddress, amount, chainId
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

const getTransactionApprove = async ({ fromToken, walletAddress, amount, chainId, web3RpcUrl }) => {
  try {
    const response = await axios.post(
      '/token/getTransactionApprove', {
      fromToken, walletAddress, amount, chainId, web3RpcUrl
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

const getTransactionSwap = async ({ fromToken, toToken, walletAddress, destReceiver, amount, chainId }) => {
  try {
    const response = await axios.post(
      '/token/getTransactionSwap', {
      fromToken, toToken, walletAddress, destReceiver, amount, chainId
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

export {
  getAllTokens,
  getAllTokensCoinMarketCap,
  getTokenMetadata,
  swapToken,
  swapTokensAvailable,
  quotePrice,
  getTransactionApprove,
  getTransactionSwap,
};
