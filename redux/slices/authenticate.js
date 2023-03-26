import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  account: "",
  provider: "",
  wallet: "",
  network: {
    chainId: null,
    ensAddress: "",
    name: "",
  }
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
  },
  extraReducers: (builder) => {
    console.log(builder);
  },
});

export const getProvider = (state) => state.authenticate.provider;

export const getAccount = (state) => state.authenticate.account;

export const getWallet = (state) => state.authenticate.wallet;

export const getNetwork = (state) => state.authenticate.network;

export const {
  setProvider,
  resetProvider,
  setAccount,
  resetAccount,
  setWallet,
  resetWallet,
  setNetwork,
  resetNetwork,
} = authenticate.actions;

export default authenticate.reducer;
