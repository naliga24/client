import { initializeConnector } from '@web3-react/core'
import { CoinbaseWallet } from '@web3-react/coinbase-wallet'
import { isCoinbaseWallet, isInjected, isMetaMaskWallet } from './utils'
import { SupportedChainId } from '../utils/chains'
import { RPC_URLS } from '../utils/networks'
import { RPC_PROVIDERS } from '../utils/providers'
import { isMobile } from '../utils/userAgent'
import { GnosisSafe } from '@web3-react/gnosis-safe'
import { MetaMask } from '@web3-react/metamask'
import { Network } from '@web3-react/network'
import { WalletConnectPopup } from './WalletConnect'
import INJECTED_DARK_ICON_URL from '../assets/mm.png';
import WALLET_CONNECT_ICON_URL from '../assets/wc.png';
import COINBASE_ICON_URL from '../assets/cbw.png';
import UNISWAP_LOGO_URL from '../assets/uniswap.png';
import GNOSIS_ICON_URL from '../assets/gnosis.png';
import { useCallback } from 'react'

function onError(error) {
    console.debug(`web3-react error: ${error}`);
  }


const isCoinbaseWalletBrowser = isMobile && isCoinbaseWallet
const isMetaMaskBrowser = isMobile && isMetaMaskWallet
const getShouldAdvertiseMetaMask = !isMetaMaskWallet && !isMobile && (!isInjected || isCoinbaseWallet)
const getIsInjectedMobileBrowser = isCoinbaseWalletBrowser || isMetaMaskBrowser
const isGenericInjector = isInjected && !isMetaMaskWallet && !isCoinbaseWallet
const [web3Injected, web3InjectedHooks] = initializeConnector((actions) => new MetaMask({ actions, onError }))

export const ConnectionType = {
    INJECTED: 'INJECTED',
    COINBASE_WALLET: 'COINBASE_WALLET',
    WALLET_CONNECT: 'WALLET_CONNECT',
    NETWORK: 'NETWORK',
    GNOSIS_SAFE: 'GNOSIS_SAFE',
  }

  const [web3Network, web3NetworkHooks] = initializeConnector(
    (actions) => new Network({ actions, urlMap: RPC_PROVIDERS, defaultChainId: 1 })
  )

  export const networkConnection = {
    name: 'Network',
    connector: web3Network,
    hooks: web3NetworkHooks,
    type: ConnectionType.NETWORK,
    shouldDisplay: false,
  }

const baseInjectedConnection = {
  name: isGenericInjector ? 'Browser Wallet' : 'MetaMask',
  connector: web3Injected,
  hooks: web3InjectedHooks,
  type: ConnectionType.INJECTED,
  shouldDisplay: isMetaMaskWallet || getShouldAdvertiseMetaMask || isGenericInjector,
  // If on non-injected, non-mobile browser, prompt user to install Metamask
  overrideActivate: getShouldAdvertiseMetaMask ? () => window.open('https://metamask.io/', 'inst_metamask') : undefined,
}

export const darkInjectedConnection = {
    ...baseInjectedConnection,
    icon: INJECTED_DARK_ICON_URL,
  }


  const [web3WalletConnect, web3WalletConnectHooks] = initializeConnector(
    (actions) => new WalletConnectPopup({ actions, onError })
  )
  export const walletConnectConnection = {
    name: 'WalletConnect',
    connector: web3WalletConnect,
    hooks: web3WalletConnectHooks,
    type: ConnectionType.WALLET_CONNECT,
    icon: WALLET_CONNECT_ICON_URL,
    shouldDisplay: !getIsInjectedMobileBrowser,
  }

  const [web3CoinbaseWallet, web3CoinbaseWalletHooks] = initializeConnector(
    (actions) =>
      new CoinbaseWallet({
        actions,
        options: {
          url: RPC_URLS[SupportedChainId.MAINNET][0],
          appName: '3ether.io',
          appLogoUrl: UNISWAP_LOGO_URL,
          reloadOnDisconnect: false,
        },
        onError,
      })
  )

  export const coinbaseWalletConnection = {
    name: 'Coinbase Wallet',
    connector: web3CoinbaseWallet,
    hooks: web3CoinbaseWalletHooks,
    type: ConnectionType.COINBASE_WALLET,
    icon: COINBASE_ICON_URL,
    shouldDisplay: Boolean((isMobile && !getIsInjectedMobileBrowser) || !isMobile || isCoinbaseWalletBrowser),
    // If on a mobile browser that isn't the coinbase wallet browser, deeplink to the coinbase wallet app
    overrideActivate:
      isMobile && !getIsInjectedMobileBrowser
        ? () => window.open('https://go.cb-w.com/mtUDhEZPy1', 'cbwallet')
        : undefined,
  }

const [web3GnosisSafe, web3GnosisSafeHooks] = initializeConnector((actions) => new GnosisSafe({ actions }))

export const gnosisSafeConnection = {
  name: 'Gnosis Safe',
  connector: web3GnosisSafe,
  hooks: web3GnosisSafeHooks,
  type: ConnectionType.GNOSIS_SAFE,
  icon: GNOSIS_ICON_URL,
  shouldDisplay: false,
}

export function getConnections() {
    return [
      darkInjectedConnection,
      walletConnectConnection,
      coinbaseWalletConnection,
      gnosisSafeConnection,
      networkConnection,
    ]
  }

  export function useGetConnection() {
    return useCallback(
      (c) => {
        if (typeof c !== "string") {
          const connection = getConnections().find((connection) => connection.connector === c)
          console.log("useGetConnection", connection);
          if (!connection) {
            throw Error('unsupported connector')
          }
          return connection
        } else {
          switch (c) {
            case ConnectionType.INJECTED:
              return darkInjectedConnection
            case ConnectionType.COINBASE_WALLET:
              return coinbaseWalletConnection
            case ConnectionType.WALLET_CONNECT:
              return walletConnectConnection
            case ConnectionType.NETWORK:
                return networkConnection
            case ConnectionType.GNOSIS_SAFE:
                return gnosisSafeConnection
            default:
                throw Error('unsupported connector')
          }
        }
      },
      []
    )
  }