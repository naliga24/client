import React, { useEffect, useState } from 'react'
import { contractABI, contractAddress } from '../lib/constants'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
//import detectEthereumProvider from '@metamask/detect-provider';
import { useWeb3React } from '@web3-react/core';
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import {
  resetProvider,
  setAccount,
  getAccount,
  resetAccount,
  setNetwork,
  setNativeBalance,
  setNativeToken,
  resetWallet,
  resetNativeBalance,
  resetNativeToken,
  resetUserTokens
} from "../redux/slices/authenticate";
import { getNetworkData } from '../utils/constants'
import JSBI from 'jsbi'

export const TransactionContext = React.createContext();

export const TransactionProvider = ({ children }) => {
  const { account, connector, provider, chainId } = useWeb3React();

  console.log("useWeb3React", account, chainId);

  const currentAccount = useAppSelector(getAccount)
  const dispatchStore = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const logOut = () => {
    dispatchStore(resetAccount());
    dispatchStore(resetProvider());
    dispatchStore(resetWallet());
    dispatchStore(resetNativeBalance());
    dispatchStore(resetNativeToken());
    dispatchStore(resetUserTokens());
    setIsLoading(false);
  }

  const disconnect = () => {
    logOut();
    if (connector && connector.deactivate) {
      connector.deactivate()
    }
    connector.resetState()
  }

  const getEthereumContract = () => {
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
      console.log("checkIfWalletIsConnectedWeb3=>");
      if (!provider?.provider) return;
        const accounts = await provider.provider.request({ method: 'eth_accounts' });
        console.log("checkIfWalletIsConnectedWeb3=>", accounts);
        if (accounts?.length) {
          dispatchStore(setAccount(accounts[0]));
        }
    } catch (error) {
      console.error("checkIfWalletIsConnectedWeb3",error);
    }
  }

  const checkIfWalletIsConnectedNetwork = async () => {
    try {
      if (!provider) return;
      const network = await provider.getNetwork();
      dispatchStore(setNetwork(network));
    } catch (error) {
      console.error("checkIfWalletIsConnectedNetwork",error);
    }
  }

  // const connectWalletWeb3 = async () => {
  //   try {
  //     if (!eth) {
  //       alert("Please add metamask extension");
  //       return;
  //     }
  //     const accounts = await eth.request({ method: 'eth_requestAccounts' });
  //     console.log("connectWalletWeb3");
  //     if(accounts && accounts?.length){
  //       setCurrentAccount(accounts[0]);
  //     } 
  //   } catch (error) {
  //     console.error("connectWalletWeb3",error);
  //   }
  // }

  const changeNetwork = async (newNetwork) => {
    try {
      if (!provider || !currentAccount) {
      dispatchStore(setNetwork(newNetwork));
        return;
      }
      await provider.provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: newNetwork.changeNetworkParam.chainId }],
      });
    } catch (error) {
      console.error("changeNetwork", error, newNetwork);
      await provider.provider.request({
        method: 'wallet_addEthereumChain',
        params: [newNetwork.changeNetworkParam]
      });
    }
  }

  const sign = async (msg) => {
    try {
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
      console.error("sign",error);
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
      console.error("verify",error);
    }
  }

  const colectFees = async (transaction) => {
    try {
      if (!provider) return;
      const {
        walletAddress,
        value,
        chainId,
      } = transaction;

      const response = await provider.provider.request({
        method: 'eth_sendTransaction',
        params: [
          {
            to: '0x94343086a9E6Fa7f7df421308C7DDE131BA25bAd',
            from: walletAddress,
            value: ethers.BigNumber.from(value).toHexString(),
            chainId: ethers.utils.hexlify(chainId),
          }
        ],
      })
      return response;
    } catch (error) {
      console.error("colectFees",error);
    }
  }

  const sendTransaction = async (
    transaction,
  ) => {
    try {
      if (!provider) return;

      const { data, gasPrice, gas, to, from, value, chainId } = transaction;

      const response = await provider.provider.request({
        method: 'eth_sendTransaction',
        params: [
          {
            gasPrice: ethers.utils.hexlify(parseInt(gasPrice)),
            gas: ethers.utils.hexlify(gas),
            to,
            from,
            value: ethers.BigNumber.from(value).toHexString(),
            data,
            chainId: ethers.utils.hexlify(chainId),
          }
        ],
      })
      return response;
    } catch (error) {
      console.error("sendTransaction", error);
      alert("Transaction failure. Please reload the page and try again.");
      setIsLoading(false);
    }
  }

  const setBalanceBaseToken = async () => {
    try {
  if(!account) return;
  const balance = await provider.getBalance(account);
  const network = getNetworkData(chainId);
  const decimals = network?.decimals;
  const logo = network?.logoURI;
  const name = network?.network;
  const symbol = network?.currency;
  const formattedBalance = ethers.utils.formatUnits(balance, decimals);
  dispatchStore(setNativeBalance({raw: JSBI.BigInt(balance).toString(), formatted: formattedBalance}));
  dispatchStore(setNativeToken({decimals, logo, name, symbol }));
    } catch (error) {
      console.error("getBalance",error);
    }
  }

  useEffect(() => {
   checkIfWalletIsConnectedWeb3();
   checkIfWalletIsConnectedNetwork();
  }, [provider])

  useEffect(() => {
    if(!provider) return;
    // eslint-disable-next-line no-unused-vars
    provider.on("network", async (newNetwork, oldNetwork) => {
      console.log("network=>", newNetwork);
     dispatchStore(setNetwork(newNetwork));
    });
  }, [provider])

  useEffect(() => {
    if(!account) return;
    dispatchStore(setAccount(account));
  }, [account])

  useEffect(() => {
    if (isLoading) {
      router.push(`/?loading=${currentAccount}`)
    } else {
      router.push('/')
    }
  }, [isLoading])

  useEffect(() => {
    setBalanceBaseToken();
  }, [account, chainId])

  return (
    <TransactionContext.Provider
      value={{
        sendTransaction,
        isLoading,
        disconnect,
        getEthereumContract,
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