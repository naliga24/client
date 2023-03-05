import React, { useEffect, useState } from 'react'
import { contractABI, contractAddress } from '../lib/constants'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import detectEthereumProvider from '@metamask/detect-provider';
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import {
  getEth,
  setEth,
} from "../redux/slices/authenticate";
export const TransactionContext = React.createContext();

export const TransactionProvider = ({ children }) => {
  const dispatchStore = useAppDispatch();
  const eth = useAppSelector(getEth);
  
  const [currentAccount, setCurrentAccount] = useState("")
  const [currentNetwork, setCurrentNetwork] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [provider, setProvider] = useState("")
  const router = useRouter()

  const disconnect = () => {
    setCurrentAccount("");
    setProvider("");
    setIsLoading(false);
  }

  const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(eth)
    const signer = provider.getSigner()
    const transactionContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer,
    )
  
    return transactionContract
  }

  const checkIfWalletIsConnectedWeb3 = async () => {
    try {
      if (!eth) return;
      let accounts = [];
      console.log("checkIfWalletIsConnectedWeb3", accounts);
       accounts = await eth.request({ method: 'eth_accounts' });
       console.log("checkIfWalletIsConnectedWeb30", accounts);
      if (accounts && accounts?.length) {
        setCurrentAccount(accounts[0])
      } else {
        setCurrentAccount("");
      }
    } catch (error) {
      console.error("err",error);
    }
  }

  const checkIfWalletIsConnectedNetwork = async () => {
    try {
      if (!eth) return;
      const provider = new ethers.providers.Web3Provider(eth, "any")
      const network = await provider.getNetwork();
      setCurrentNetwork(network);
    } catch (error) {
      console.error("err",error);
    }
  }

  const connectWalletWeb3 = async () => {
    try {
      if (!eth) {
        alert("Please add metamask extension");
        return;
      }
      const accounts = await eth.request({ method: 'eth_requestAccounts' });
      console.log("connectWalletWeb3", accounts);
      if(accounts && accounts?.length){
        setCurrentAccount(accounts[0]);
      } 
    } catch (error) {
      console.error("err",error);
    }
  }

  const changeNetwork = async (newNetwork) => {
    try {
      console.log("request", eth, currentAccount, newNetwork);
      if (!eth || !currentAccount) {
      setCurrentNetwork(newNetwork);
        return;
      }
      await eth.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: newNetwork.changeNetworkParam.chainId }],
      });
    } catch (error) {
      console.log("error", error, newNetwork, eth);
      await eth.request({
        method: 'wallet_addEthereumChain',
        params: [newNetwork.changeNetworkParam]
      });
    }
  }

  const sign = async (msg) => {
    try {
      const provider = new ethers.providers.Web3Provider(eth);
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
      console.error("err",error);
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
      console.error("err",error);
    }
  }

  const colectFees = async (transaction) => {
    try {
      if (!eth) return;
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
      console.error("err",error);
    }
  }

  const sendTransaction = async (
    transaction,
  ) => {
    try {
      if (!eth) return;
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
      console.error("err",error);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnectedWeb3();
    checkIfWalletIsConnectedNetwork();
  }, [eth])

  useEffect(() => {
    if(!eth) return;
    const provider = new ethers.providers.Web3Provider(eth, "any")
    eth.on('accountsChanged', function (accounts) {
      console.log("accountsChanged");
      setCurrentAccount(accounts[0]);
    });
    // eslint-disable-next-line no-unused-vars
    provider.on("network", async (newNetwork, oldNetwork) => {
      console.log("network", newNetwork);
      setCurrentNetwork(newNetwork);
    });
  }, [eth])

  useEffect(() => {
    if (isLoading) {
      router.push(`/?loading=${currentAccount}`)
    } else {
      router.push('/')
    }
  }, [isLoading])

  useEffect(() => {
    const getEth = async() =>{
    const providerDetect = await detectEthereumProvider();
    dispatchStore(setEth(providerDetect));
    }
    getEth();
  }, [])

  return (
    <TransactionContext.Provider
      value={{
        connectWalletWeb3,
        currentAccount,
        sendTransaction,
        isLoading,
        provider,
        disconnect,
        getEthereumContract,
        currentNetwork,
        changeNetwork,
        sign,
        verify,
        setIsLoading,
        setProvider,
        colectFees,
        eth,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}