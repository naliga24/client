import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  provider: {},
};

export const authenticate = createSlice({
  name: "authenticate",
  initialState,
  reducers: {
    setProvider: (state, action) => {
      state.provider = action.payload;
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

export const {
  setProvider,
  resetProvider,
} = authenticate.actions;

export default authenticate.reducer;
