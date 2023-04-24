import React, { useEffect } from 'react'
import { Network, Alchemy } from 'alchemy-sdk';
import { useWeb3React } from '@web3-react/core';
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import JSBI from 'jsbi';
import { ethers } from 'ethers';
import {
  setUserTokens,
  getSwapAvailableTokens,
} from "../redux/slices/authenticate";

export const AlchemyContext = React.createContext();

export const AlchemyProvider = ({ children }) => {
  const dispatchStore = useAppDispatch();
  const swapAvailableTokens = useAppSelector(getSwapAvailableTokens);
  const { account, chainId } = useWeb3React();

  let alchemy;

  useEffect(() => {
  if(account){
    let apiKey;
    let network;
     
    if(chainId && chainId === 1){
      network = Network.ETH_MAINNET;
      apiKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY_ETH_MAINNET;
  
    }else if(chainId && chainId === 137){
      network = Network.MATIC_MAINNET; 
      apiKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY_MATIC_MAINNET;
    }
  
    const settings = {
      apiKey,
      network,
  };
  
   alchemy = new Alchemy(settings);

   alchemy.core
   .getTokenBalances(account)
   .then(async(balances)=>{
     if(balances?.tokenBalances?.length){
       const tokens = [];
       const nonZeroBalances = balances.tokenBalances.filter((token) => {
        return JSBI.BigInt(token.tokenBalance).toString() !== "0";
      });
      for (let token of nonZeroBalances) {
        const contractAddress = token?.contractAddress;
        const metadata = await alchemy.core.getTokenMetadata(contractAddress);
        let tokenBalance = token.tokenBalance;
        const raw = JSBI.BigInt(tokenBalance).toString();
        const formatted = ethers.utils.formatUnits(tokenBalance, metadata?.decimals);
        const name = metadata?.name;
        const symbol = metadata?.symbol;
        const decimals = metadata?.decimals;
        const balance = {raw, formatted};
        const fondToken = swapAvailableTokens?.find((availableToken)=>availableToken?.address?.toLowerCase() === contractAddress?.toLowerCase());
        tokens.push({
          name, symbol, balance, decimals, logo: fondToken?.logoURI,
        });
     }
     dispatchStore(setUserTokens(tokens));
     }
   }).catch(err=>console.error("getTokenBalances:", err));

    alchemy.ws.on(
      { 
      method: "alchemy_pendingTransactions",
      fromAddress: account, 
      toAddress: account,
      },
      (res) => console.log("alchemy_pendingTransactions=>",res)
      );
  }
  }, [account])

  return (
    <AlchemyContext.Provider
      value={{
        alchemy,
      }}
    >
      {children}
    </AlchemyContext.Provider>
  )
}