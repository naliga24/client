import React, { useEffect, useState } from 'react'
import { contractABI, contractAddress } from '../lib/constants'
import { ethers } from 'ethers'
import { client } from '../lib/sanityClient'
import { useRouter } from 'next/router'
import { 
  useMoralis, 
  //useOneInchSwap 
} from "react-moralis";
import Moralis from "moralis";
Moralis.initialize("YWZn3WQiCiWCJSqkMpjU1JdrwiDaXrQTFjKEpSIY");
Moralis.serverURL = "https://pxlcw9zmhyxv.usemoralis.com:2053/server";

export const TransactionContext = React.createContext()

let eth

if (typeof window !== 'undefined') {
  eth = window.ethereum
}

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider()
  const signer = provider.getSigner()
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer,
  )

  return transactionContract
}

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [formData, setFormData] = useState({
    addressTo: '',
    amount: '',
  })
  // eslint-disable-next-line no-unused-vars
  const {
    authenticate,
    isAuthenticated,
    // isAuthenticating, 
    user,
    //account, 
    // web3, 
    // enableWeb3, 
    // isWeb3Enabled, 
    // isWeb3EnableLoading, 
    // web3EnableError,
    //ByMoralis //<ByMoralis width={300} variant="dark" /> or <ByMoralis width={300} variant="light" />
    logout,
  } = useMoralis();

  // const { 
  //   swap, 
  //   //data, 
  //   //isFetching, 
  //   //isLoading, 
  //   //error 
  // } = useOneInchSwap();
  /**
   * Trigger loading modal
   */
  useEffect(() => {
    if (isLoading) {
      router.push(`/?loading=${currentAccount}`)
    } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  /**
   * Create user profile in Sanity
   */
  useEffect(() => {
    // console.log("useEffect=>", currentAccount);
    if (!currentAccount) return
      ; (async () => {
        const userDoc = {
          _type: 'users',
          _id: currentAccount,
          userName: 'Unnamed',
          address: currentAccount,
        }

        await client.createIfNotExists(userDoc)
      })()
  }, [currentAccount])

  const handleChange = (e, name) => {
    setFormData(prevState => ({ ...prevState, [name]: e.target.value }))
  }

  const clearCurrentAccount = () => {
    setCurrentAccount("");
  }


  /**
   * Checks if MetaMask is installed and an account is connected
   * @param {*} metamask Injected MetaMask code from the browser
   * @returns
   */
  const checkIfWalletIsConnected = async (metamask = eth) => {
    try {
      if (!metamask) return alert('Please install metamask ')
      //const accounts = await metamask.request({ method: 'eth_accounts' })
      console.log("isAuthenticated=>", isAuthenticated);
      if (isAuthenticated) {
        const currentAccount = user.get("ethAddress");
        console.log("isAuthenticated=>", currentAccount);
        setCurrentAccount(currentAccount)
      }
    } catch (error) {
      console.error(error)
      // throw new Error('No ethereum object.')
    }
  }

  /**
   * Prompts user to connect their MetaMask wallet
   * @param {*} metamask Injected MetaMask code from the browser
   */
  const connectWallet = async (metamask = eth) => {
    try {
      // if (!metamask) return alert('Please install metamask ')

      // //const accounts = await metamask.request({ method: 'eth_requestAccounts' })

      // setCurrentAccount(accounts[0])
      if (!metamask) return alert('Please install metamask ')
      await authenticate({ signingMessage: "Log in using Moralis" })
        .then(function (user) {
          const connectedAddress = user.get("ethAddress");
          console.log("connectedAddress=>", connectedAddress);
          setCurrentAccount(connectedAddress)
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.error(error)
      // throw new Error('No ethereum object.')
    }
  }

  const logOut = async () => {
    await logout();
    console.log("logged out");
  }

  /**
   * Saves transaction to Sanity DB
   * @param {string} txHash Transaction hash
   * @param {number} amount Amount of ETH that was sent
   * @param {string} fromAddress Sender address
   * @param {string} toAddress Recipient address
   * @returns null
   */
  const saveTransaction = async (
    txHash,
    amount,
    fromAddress = currentAccount,
    toAddress,
  ) => {
    const txDoc = {
      _type: 'transactions',
      _id: txHash,
      fromAddress: fromAddress,
      toAddress: toAddress,
      timestamp: new Date(Date.now()).toISOString(),
      txHash: txHash,
      amount: parseFloat(amount),
    }

    await client.createIfNotExists(txDoc)

    await client
      .patch(currentAccount)
      .setIfMissing({ transactions: [] })
      .insert('after', 'transactions[-1]', [
        {
          _key: txHash,
          _ref: txHash,
          _type: 'reference',
        },
      ])
      .commit()

    return
  }

  /**
   * Executes a transaction
   * @param {*} metamask Injected MetaMask code from the browser
   * @param {string} currentAccount Current user's address
   */
  const sendTransaction = async (
    metamask = eth,
    connectedAccount = currentAccount,
  ) => {
    try {
      if (!metamask) return alert('Please install metamask ')
      const { addressTo, amount } = formData
      const transactionContract = getEthereumContract()

      const parsedAmount = ethers.utils.parseEther(amount)

      await metamask.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: connectedAccount,
            to: addressTo,
            gas: '0x7EF40', // 520000 Gwei
            value: parsedAmount._hex,
          },
        ],
      })

      const transactionHash = await transactionContract.publishTransaction(
        addressTo,
        parsedAmount,
        `Transferring ETH ${parsedAmount} to ${addressTo}`,
        'TRANSFER',
      )

      setIsLoading(true)

      await transactionHash.wait()

      await saveTransaction(
        transactionHash.hash,
        amount,
        connectedAccount,
        addressTo,
      )

      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [isAuthenticated])

  const swapToken = async () => { 
    try {
      let dex
      await Moralis.initPlugins();
      dex = Moralis.Plugins.oneInch;
      //await Moralis.enable();
       await Moralis.authenticate();
      console.log("swapToken=>")
      const NATIVE_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"; //native addres for the current chain (not real address).
      const ONEINCH_ADDRESS = "0x111111111117dc0aa78b770fa6a738034120c302";

      const options = {
        chain: "eth", // The blockchain you want to use (eth/bsc/polygon)
        fromTokenAddress: NATIVE_ADDRESS,
        toTokenAddress: ONEINCH_ADDRESS,
        amount: Number(Moralis.Units.ETH("0.0001")),
        //amount: Number(1000000000000),
        //fromAddress: user.get("ethAddress"),
        fromAddress: Moralis.User.current().get("ethAddress"),
        slippage: 1
      }


      //var receipt = await swap(options);
      var receipt = await dex.swap(options);
      console.log("receipt=>", receipt)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        setFormData,
        handleChange,
        sendTransaction,
        isLoading,
        logOut,
        clearCurrentAccount,
        swapToken,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}