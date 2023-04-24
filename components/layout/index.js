import React from 'react';
import Header from '../header';
import Footer from '../footer';
import { Wrapper } from "./style";

const Layout = ({children}) => {
  return (
    <Wrapper>
      <Header />
        {children}
        <Footer />
    </Wrapper>
  )
}

export default Layout