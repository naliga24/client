/*
 * SupportedChainId must be defined inline, without using @uniswap/sdk-core, so that its members are their own types
 * {@see https://www.typescriptlang.org/docs/handbook/enums.html#union-enums-and-enum-member-types}. This allows the
 * derived const arrays and their types (eg {@link L1_CHAIN_IDS}, {@link SupportedL1ChainId}) to be narrowed and used
 * to enforce chain typing.
 *
 * Because this is not explicitly derived from @uniswap/sdk-core, there is a unit test to enforce conformance.
 */
export const SupportedChainId = {
  MAINNET: 1,
  GOERLI: 5,

  ARBITRUM_ONE: 42161,
  ARBITRUM_GOERLI: 421613,

  OPTIMISM: 10,
  OPTIMISM_GOERLI: 420,

  POLYGON: 137,
  POLYGON_MUMBAI: 80001,

  CELO: 42220,
  CELO_ALFAJORES: 44787,

  BNB: 56,
}

export const CHAIN_IDS_TO_NAMES = {
  [SupportedChainId.MAINNET]: 'mainnet',
  [SupportedChainId.GOERLI]: 'goerli',
  [SupportedChainId.POLYGON]: 'polygon',
  [SupportedChainId.POLYGON_MUMBAI]: 'polygon_mumbai',
  [SupportedChainId.CELO]: 'celo',
  [SupportedChainId.CELO_ALFAJORES]: 'celo_alfajores',
  [SupportedChainId.ARBITRUM_ONE]: 'arbitrum',
  [SupportedChainId.ARBITRUM_GOERLI]: 'arbitrum_goerli',
  [SupportedChainId.OPTIMISM]: 'optimism',
  [SupportedChainId.OPTIMISM_GOERLI]: 'optimism_goerli',
  [SupportedChainId.BNB]: 'bnb',
}

/**
 * Array of all the supported chain IDs
 */
export const ALL_SUPPORTED_CHAIN_IDS = Object.values(SupportedChainId).filter(
  (id) => typeof id === 'number'
)

export function isSupportedChain(chainId) {
  return !!chainId && !!SupportedChainId[chainId]
}

export const SUPPORTED_GAS_ESTIMATE_CHAIN_IDS = [
  SupportedChainId.MAINNET,
  SupportedChainId.POLYGON,
  SupportedChainId.CELO,
  SupportedChainId.OPTIMISM,
  SupportedChainId.ARBITRUM_ONE,
  SupportedChainId.BNB,
]

/**
 * Unsupported networks for V2 pool behavior.
 */
export const UNSUPPORTED_V2POOL_CHAIN_IDS = [
  SupportedChainId.POLYGON,
  SupportedChainId.OPTIMISM,
  SupportedChainId.ARBITRUM_ONE,
  SupportedChainId.BNB,
  SupportedChainId.ARBITRUM_GOERLI,
]

export const TESTNET_CHAIN_IDS = [
  SupportedChainId.GOERLI,
  SupportedChainId.POLYGON_MUMBAI,
  SupportedChainId.ARBITRUM_GOERLI,
  SupportedChainId.OPTIMISM_GOERLI,
]

export const SupportedTestnetChainId = (number)=> typeof TESTNET_CHAIN_IDS[number]

/**
 * All the chain IDs that are running the Ethereum protocol.
 */
export const L1_CHAIN_IDS = [
  SupportedChainId.MAINNET,
  SupportedChainId.GOERLI,
  SupportedChainId.POLYGON,
  SupportedChainId.POLYGON_MUMBAI,
  SupportedChainId.CELO,
  SupportedChainId.CELO_ALFAJORES,
  SupportedChainId.BNB,
]

export const SupportedL1ChainId = (number)=> typeof L1_CHAIN_IDS[number]

/**
 * Controls some L2 specific behavior, e.g. slippage tolerance, special UI behavior.
 * The expectation is that all of these networks have immediate transaction confirmation.
 */
export const L2_CHAIN_IDS = [
  SupportedChainId.ARBITRUM_ONE,
  SupportedChainId.ARBITRUM_GOERLI,
  SupportedChainId.OPTIMISM,
  SupportedChainId.OPTIMISM_GOERLI,
]

export const SupportedL2ChainId = (number)=> typeof L2_CHAIN_IDS[number]
