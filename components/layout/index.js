import React from 'react';
import Header from '../header'
import { Wrapper } from "./style"

const Layout = ({children}) => {
  return (
    <Wrapper>
      <Header />
        {children}
    </Wrapper>
  )
}

export default Layout