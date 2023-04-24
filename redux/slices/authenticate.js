import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  account: "",
  provider: "",
  wallet: "",
  network: {
    chainId: null,
    ensAddress: "",
    name: "",
  },
  nativeBalance: {
    raw: '',
    formatted: '',
  },
  nativeToken: {
   decimals: null,
   logo: '',
   name: '',
   symbol: '',
  },
  userTokens: [],
  swapAvailableTokens: [],
};

export const authenticate = createSlice({
  name: "authenticate",
  initialState,
  reducers: {
    setProvider: (state, action) => {
      state.provider = action.payload;
    },
    resetProvider: (state) => {
      state.provider = "";
    },
    setAccount: (state, action) => {
      state.account = action.payload;
    },
    resetAccount: (state) => {
      state.account = "";
    },
    setWallet: (state, action) => {
      state.wallet = action.payload;
    },
    resetWallet: (state) => {
      state.wallet = "";
    },
    setNetwork: (state, action) => {
      state.network = {
        chainId: action.payload?.chainId,
        ensAddress: action.payload?.ensAddress,
        name: action.payload?.name,
      }
    },
    resetNetwork: (state) => {
      state.network = {
        chainId: null,
        ensAddress: "",
        name: "",
      }
    },
    setNativeBalance: (state, action) => {
      state.nativeBalance.raw = action.payload.raw;
      state.nativeBalance.formatted = action.payload.formatted;
    },
    resetNativeBalance: (state) => {
      state.nativeBalance = {
        raw: '',
        formated: '',
      };
    },
    setNativeToken: (state, action) => {
      state.nativeToken.decimals = action.payload.decimals;
      state.nativeToken.logo = action.payload.logo;
      state.nativeToken.name = action.payload.name;
      state.nativeToken.symbol = action.payload.symbol;
    },
    resetNativeToken: (state) => {
      state.nativeBalance = {
        decimals: null,
        logo: '',
        name: '',
        symbol: '',
      };
    },
    setUserTokens: (state, action) => {
      state.userTokens = action.payload;
    },
    resetUserTokens: (state) => {
      state.userTokens = [];
    },
    setSwapAvailableTokens: (state, action) => {
      state.swapAvailableTokens = action.payload;
    },
    resetSwapAvailableTokens: (state) => {
      state.swapAvailableTokens = [];
    },
  },
  extraReducers: (builder) => {
    console.log(builder);
  },
});

export const getProvider = (state) => state.authenticate.provider;

export const getAccount = (state) => state.authenticate.account;

export const getWallet = (state) => state.authenticate.wallet;

export const getNetwork = (state) => state.authenticate.network;

export const getNativeBalance = (state) => state.authenticate.nativeBalance;

export const getNativeToken = (state) => state.authenticate.nativeToken;

export const getUserTokens = (state) => state.authenticate.userTokens;

export const getSwapAvailableTokens = (state) => state.authenticate.swapAvailableTokens;

export const {
  setProvider,
  resetProvider,
  setAccount,
  resetAccount,
  setWallet,
  resetWallet,
  setNetwork,
  resetNetwork,
  setNativeBalance,
  resetNativeBalance,
  setNativeToken,
  resetNativeToken,
  setUserTokens,
  resetUserTokens,
  setSwapAvailableTokens,
  resetSwapAvailableTokens,
} = authenticate.actions;

export default authenticate.reducer;
