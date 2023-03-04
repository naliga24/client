import { useEffect, useContext } from 'react'
import { TransactionContext } from './TransactionContext'

const ConnectorsProvider = ({ children })=> {
  const {
    //activateInjectedProvider
  } =
    useContext(TransactionContext)
  useEffect(() => {
    //activateInjectedProvider("MetaMask"); 
  }, [])

  return children
}

export default ConnectorsProvider