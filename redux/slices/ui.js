import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  walletModal: false,
  accountModal: false,
};

export const ui = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openWalletModal: (state) => {
      state.walletModal = true;
    },
    closeWalletModal: (state) => {
      state.walletModal = false;
    },
    openAccountModal: (state) => {
      state.accountModal = true;
    },
    closeAccountModal: (state) => {
      state.accountModal = false;
    },
  },
  extraReducers: (builder) => {
    console.log(builder);
  },
});

export const getWalletModal = (state) => state.ui.walletModal;

export const getAccountModal = (state) => state.ui.accountModal;

export const {
  openWalletModal,
  closeWalletModal,
  openAccountModal,
  closeAccountModal,
} = ui.actions;

export default ui.reducer;
