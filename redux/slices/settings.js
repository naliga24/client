import { createSlice } from "@reduxjs/toolkit";

const gasPriceTypeConst = {
  low: "low",
  medium: "medium",
  high: "high",
  instant: "instant",
  custom: "custom",
};

const initialState = {
  slippage: 0.5,
  customSlippage: 1.001,
  isCustomSlippage: false,
  isPartialFill: true,
  gasPriceType: gasPriceTypeConst.high,
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
    setGasPriceType: (state, action) => {
      state.gasPriceType = gasPriceTypeConst[action.payload];
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

export const getGasPriceType = (state) => state.settings.gasPriceType;

export const {
  setSlippage,
  setCustomSlippage,
  setIsCustomSlippage,
  setIsPartialFill,
  setGasPriceType,
} = settings.actions;

export default settings.reducer;
