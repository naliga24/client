import React from 'react'
import '../styles/globals.css'
import { TransactionProvider } from '../context/TransactionContext'
// import { MoralisProvider } from "react-moralis";
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
//import theme from "theme";
const isBrowser = typeof document !== "undefined";
let insertionPoint;

if (isBrowser) {
  console.log("isBrowser");
  insertionPoint = document.getElementById("jss-insertion-point");
}

const jss = create({
  ...jssPreset(),
  insertionPoint
});

const localeMap = {
  en: enLocale,
};

function MyApp({ Component, pageProps }) {

  return (
    // <MoralisProvider 
    // serverUrl={process.env.MORALIS_SERVER_URL} 
    // appId={process.env.MORALIS_APP_ID}
    // >
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
    // </MoralisProvider>
  )
}

export default MyApp