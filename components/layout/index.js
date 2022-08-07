//import type { NextPage } from 'next'
import Header from '../header'
import TransactionHistory from '../TransactionHistory'
import { Wrapper } from "./style"

// const style = {
//   wrapper: `w-full h-screen max-h-screen h-min-screen w-screen bg-[#2D242F] text-white select-none flex flex-col justify-between`,
// }

const Layout = ({children}) => {
  return (
    <Wrapper>
    {/* <div className={style}> */}
      <Header />
        {children}
      <TransactionHistory />
    {/* </div> */}
    </Wrapper>
  )
}

export default Layout