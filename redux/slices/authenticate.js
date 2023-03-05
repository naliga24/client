import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  provider: {},
  eth: {},
};

export const authenticate = createSlice({
  name: "authenticate",
  initialState,
  reducers: {
    setProvider: (state, action) => {
      state.provider = action.payload;
    },
    setEth: (state, action) => {
      state.eth = action.payload;
    },
    resetProvider: (state) => {
      state.provider = {};
    },
  },
  extraReducers: (builder) => {
    console.log(builder);
  },
});

export const getProvider = (state) => state.authenticate.provider;

export const getEth = (state) => state.authenticate.eth;

export const {
  setProvider,
  setEth,
  resetProvider,
} = authenticate.actions;

export default authenticate.reducer;
