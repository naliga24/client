import React from 'react';
import Header from '../header'
import TransactionHistory from '../TransactionHistory'
import { Wrapper } from "./style"

const Layout = ({children}) => {
  return (
    <Wrapper>
      <Header />
        {children}
      <TransactionHistory />
    </Wrapper>
  )
}

export default Layout