import React, { useEffect, useState } from 'react'
import { contractABI, contractAddress } from '../lib/constants'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'

export const TransactionContext = React.createContext()

let eth

if (typeof window !== 'undefined') {
  eth = window.ethereum
}

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
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
  const [currentNetwork, setCurrentNetwork] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const clearCurrentAccount = () => {
    setCurrentAccount("");
  }


  const checkIfWalletIsConnectedWeb3 = async (metamask = eth) => {
    try {
      if (!metamask) return alert('Please install metamask ')
      const accounts = await metamask.request({ method: 'eth_accounts' })
      if (accounts) {
        setCurrentAccount(accounts[0])
      }
    } catch (error) {
      console.error(error)
    }
  }

  const checkIfWalletIsConnectedNetwork = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const network = await provider.getNetwork();
      setCurrentNetwork(network);
    } catch (error) {
      console.error(error)
    }
  }

  const connectWalletWeb3 = async (metamask = eth) => {
    try {
      if (!metamask) return alert('Please install metamask ')
      const accounts = await metamask.request({ method: 'eth_requestAccounts' })
      setCurrentAccount(accounts[0])
    } catch (error) {
      console.error(error)
    }
  }

  const changeNetwork = async (newNetwork) => {
    const metamask = eth;
    try {
      if (!metamask) return alert('Please install metamask ')
      await metamask.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: newNetwork.changeNetworkParam.chainId }],
      });
    } catch (error) {
      const changeNetwork = await metamask.request({
        method: 'wallet_addEthereumChain',
        params: [newNetwork.changeNetworkParam]
      });
    }
  }

  const sign = async (msg) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const message = msg;
      const signer = provider.getSigner();
      const signature = await signer.signMessage(message);
      const address = await signer.getAddress();
      return {
        message,
        signature,
        address,
      };
    } catch (error) {
      console.error(error)
    }
  }

  const verify = ({ message, address, signature }) => {
    try {
      const signerAddress = ethers.utils.verifyMessage(message, signature);
      if (signerAddress !== address) {
        return false;
      }
      return true;

    } catch (error) {
      console.error(error)
    }
  }

  const colectFees = async (transaction) => {
    try {
      if (!eth) return alert('Please install metamask ')
      const { 
        walletAddress, 
        value, 
        chainId,
      } = transaction;
     const response = await eth.request({
        method: 'eth_sendTransaction',
        params: [
          {
            to: '0x94343086a9E6Fa7f7df421308C7DDE131BA25bAd',
            from: walletAddress,
            value: ethers.BigNumber.from(String(value)).toHexString(),
            chainId: ethers.utils.hexlify(chainId),
          }
        ],
      })
      return response;
    } catch (error) {
      console.error(error)
    }
  }

    const sendTransaction = async (
    transaction,
  ) => {
    try {
      if (!eth) return alert('Please install metamask ')
     const { data, gasPrice, gas, to, from, value, chainId } = transaction;
     const response = await eth.request({
        method: 'eth_sendTransaction',
        params: [
          {
            gasPrice: ethers.utils.hexlify(parseInt(gasPrice)), 
            gas: ethers.utils.hexlify(gas),
            to,
            from,
            value: ethers.utils.hexlify(parseInt(value)),
            data,
            chainId: ethers.utils.hexlify(chainId),
          }
        ],
      })
      return response;
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnectedWeb3()
  }, [])

  useEffect(() => {
    checkIfWalletIsConnectedNetwork()
  }, [])

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
    eth.on('accountsChanged', function (accounts) {
      setCurrentAccount(accounts[0]);
    });
    provider.on("network", async (newNetwork, oldNetwork) => {
      setCurrentNetwork(newNetwork);
    });
  }, [])

  useEffect(() => {
    if (isLoading) {
      router.push(`/?loading=${currentAccount}`)
    } else {
      router.push('/')
    }
  }, [isLoading])

  return (
    <TransactionContext.Provider
      value={{
        connectWalletWeb3,
        currentAccount,
        sendTransaction,
        isLoading,
        clearCurrentAccount,
        getEthereumContract,
        currentNetwork,
        changeNetwork,
        sign,
        verify,
        setIsLoading,
        colectFees,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}