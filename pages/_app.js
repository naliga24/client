import React from 'react'
import '../styles/globals.css'
import { TransactionProvider } from '../context/TransactionContext'
import { MoralisProvider } from "react-moralis";
import { ThemeProvider } from "styled-components";

import { StyledEngineProvider } from "@mui/styled-engine-sc";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import StylesProvider from "@mui/styles/StylesProvider";
import enLocale from "date-fns/locale/en-GB";
import Layout from "../components/layout";

const localeMap = {
  en: enLocale,
};

function MyApp({ Component, pageProps }) {

  return (
    <MoralisProvider serverUrl={process.env.MORALIS_SERVER_URL} appId={process.env.MORALIS_APP_ID}>
      <TransactionProvider>
        <StylesProvider>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={localeMap.en}
          >
            <StyledEngineProvider injectFirst>
              <MuiThemeProvider theme={{}}>
                <ThemeProvider theme={{}}>
                  <Layout>
                  <Component {...pageProps} />
                  </Layout>
                </ThemeProvider>
              </MuiThemeProvider>
            </StyledEngineProvider>
          </LocalizationProvider>
        </StylesProvider>
      </TransactionProvider>
    </MoralisProvider>
  )
}

export default MyApp