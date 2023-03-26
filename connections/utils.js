let eth;

if (typeof window !== 'undefined') {
  eth = window?.ethereum;
}

export const isInjected = Boolean(eth)

// When using Brave browser, `isMetaMask` is set to true when using the built-in wallet
// This variable should be true only when using the MetaMask extension
// https://wallet-docs.brave.com/ethereum/wallet-detection#compatability-with-metamask
const allNonMetamaskFlags= ['isRabby', 'isBraveWallet', 'isTrustWallet']
export const isMetaMaskWallet = Boolean(
  eth?.isMetaMask && !allNonMetamaskFlags.some((flag) => eth[flag])
)

export const isCoinbaseWallet = Boolean(eth?.isCoinbaseWallet)

// https://eips.ethereum.org/EIPS/eip-1193#provider-errors
export const ErrorCode = {
  USER_REJECTED_REQUEST: 4001,
  UNAUTHORIZED: 4100,
  UNSUPPORTED_METHOD: 4200,
  DISCONNECTED: 4900,
  CHAIN_DISCONNECTED: 4901,

  // https://docs.metamask.io/guide/rpc-api.html#unrestricted-methods
  CHAIN_NOT_ADDED: 4902,
  MM_ALREADY_PENDING: -32002,

  WC_MODAL_CLOSED: 'Error: User closed modal',
  CB_REJECTED_REQUEST: 'Error: User denied account authorization',
}
