import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  slippage: 0.5,
  customSlippage: 1.001,
  isCustomSlippage: false,
  isPartialFill: true,
};

export const settings = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSlippage: (state, action) => {
      state.slippage = action.payload;
    },
    setCustomSlippage: (state, action) => {
      state.customSlippage = action.payload;
    },
    setIsCustomSlippage: (state, action) => {
      state.isCustomSlippage = action.payload;
    },
    setIsPartialFill: (state, action) => {
      state.isPartialFill = action.payload;
    },
  },
  extraReducers: (builder) => {
    console.log(builder);
  },
});

export const getSlippage = (state) => state.settings.slippage;

export const getCustomSlippage = (state) => state.settings.customSlippage;

export const getIsCustomSlippage = (state) => state.settings.isCustomSlippage;

export const getIsPartialFill = (state) => state.settings.isPartialFill;

export const {
  setSlippage,
  setCustomSlippage,
  setIsCustomSlippage,
  setIsPartialFill,
} = settings.actions;

export default settings.reducer;
