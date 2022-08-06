//import type { NextPage } from 'next'
import Header from '../header'
import TransactionHistory from '../TransactionHistory'

const style = {
  wrapper: `h-screen max-h-screen h-min-screen w-screen bg-[#2D242F] text-white select-none flex flex-col justify-between`,
}

const Layout = ({children}) => {
  return (
    <div className={style.wrapper}>
      <Header />
        {children}
      <TransactionHistory />
    </div>
  )
}

export default Layout