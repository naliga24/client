import React from 'react'
import { StrictMode } from "react";
import '../styles/globals.css'
import { TransactionProvider } from '../context/TransactionContext'
import { ThemeProvider } from "styled-components";
import { create } from "jss";
import { StyledEngineProvider } from "@mui/styled-engine-sc";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import StylesProvider from "@mui/styles/StylesProvider";
import enLocale from "date-fns/locale/en-GB";
import Layout from "../components/layout";
import jssPreset from "@mui/styles/jssPreset";
import createTheme from "../theme";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import ConnectorsProvider from "../context/ConnectorsContext";

const isBrowser = typeof document !== "undefined";
let insertionPoint;

if (isBrowser) {
  insertionPoint = document.getElementById("jss-insertion-point");
}

const jss = create({
  ...jssPreset(),
  insertionPoint
});

let persistor = persistStore(store);

const localeMap = {
  en: enLocale,
};

if (typeof window !== 'undefined') {
  window.ethereum.autoRefreshOnNetworkChange = false
}

function MyApp({ Component, pageProps }) {

  return (
    <StrictMode>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <ConnectorsProvider>
      <TransactionProvider>
        <StylesProvider jss={jss}>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={localeMap.en}
          >
            <StyledEngineProvider injectFirst>
              <MuiThemeProvider theme={createTheme()}>
                <ThemeProvider theme={createTheme()}>
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </ThemeProvider>
              </MuiThemeProvider>
            </StyledEngineProvider>
          </LocalizationProvider>
        </StylesProvider>
      </TransactionProvider>
      </ConnectorsProvider>
      </PersistGate>
      </Provider>
      </StrictMode>
  )
}

export default MyApp