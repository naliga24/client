const NETWORKS_AVAILABLE = [
  {
    //network: "Ethereum Mainnet",
    network: "Ethereum",
    chainId: 1,
    currency: "ETH",
    decimals: 18,
    logoURI: "https://app.1inch.io/assets/images/network-logos/ethereum.svg",
    changeNetworkParam: {
      chainId: "0x1",
      rpcUrls: [
        "https://mainnet.infura.io/v3/",
        "https://eth.llamarpc.com",
        "https://eth-pokt.nodies.app",
        "wss://ethereum.publicnode.com",
      ],
      chainName: "Ethereum Mainnet",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
      blockExplorerUrls: ["https://etherscan.io"],
    },
  },
  {
    //network: "Binance Smart Chain Mainnet",
    network: "BNB Chain",
    chainId: 56,
    currency: "BNB",
    decimals: 18,
    logoURI:
      "https://app.1inch.io/assets/images/network-logos/binance-light_2.svg",
    changeNetworkParam: {
      chainId: "0x38",
      rpcUrls: [
        "https://bsc-dataseed1.ninicoin.io",
        "https://binance.llamarpc.com",
        "https://bsc-pokt.nodies.app",
        "wss://bsc.publicnode.com",
      ],
      chainName: "Binance Smart Chain Mainnet",
      nativeCurrency: {
        name: "BNB",
        symbol: "BNB",
        decimals: 18,
      },
      blockExplorerUrls: ["https://bscscan.com"],
    },
  },
  {
    //network: "Polygon Mainnet",
    network: "Polygon",
    chainId: 137,
    currency: "MATIC",
    decimals: 18,
    logoURI: "https://app.1inch.io/assets/images/network-logos/polygon.svg",
    changeNetworkParam: {
      chainId: "0x89",
      rpcUrls: [
        "https://polygon-rpc.com",
        "https://polygon.llamarpc.com",
        "https://polygon-bor.publicnode.com",
        "wss://polygon-bor.publicnode.com",
      ],
      chainName: "Polygon Mainnet",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
      },
      blockExplorerUrls: ["https://polygonscan.com"],
    },
  },
  {
    network: "Optimism",
    chainId: 10,
    currency: "ETH",
    decimals: 18,
    logoURI: "https://app.1inch.io/assets/images/network-logos/optimism.svg",
    changeNetworkParam: {
      chainId: "0xA",
      rpcUrls: [
        "https://mainnet.optimism.io",
        "https://optimism.llamarpc.com",
        "https://op-pokt.nodies.app",
        "https://optimism.drpc.org",
        "wss://optimism.publicnode.com",
      ],
      chainName: "Optimism",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
      blockExplorerUrls: ["https://optimistic.etherscan.io"],
    },
  },
  {
    //network: "Arbitrum One",
    network: "Arbitrum",
    chainId: 42161,
    currency: "ETH",
    decimals: 18,
    logoURI: "https://app.1inch.io/assets/images/network-logos/arbitrum.svg",
    changeNetworkParam: {
      chainId: "0xA4B1",
      rpcUrls: [
        "https://arb1.arbitrum.io/rpc",
        "https://arbitrum.llamarpc.com",
        "https://arb-pokt.nodies.app",
        "https://endpoints.omniatech.io/v1/arbitrum/one/public",
        "wss://arbitrum-one.publicnode.com",
      ],
      chainName: "Arbitrum One",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
      blockExplorerUrls: ["https://arbiscan.io"],
    },
  },
  {
    network: "Gnosis",
    chainId: 100,
    currency: "xDAI",
    decimals: 18,
    logoURI: "https://app.1inch.io/assets/images/network-logos/gnosis.svg",
    changeNetworkParam: {
      chainId: "0x64",
      rpcUrls: [
        "https://rpc.gnosischain.com",
        "https://rpc.ankr.com/gnosis",
        "https://gnosis-pokt.nodies.app",
        "wss://gnosis.publicnode.com",
        "https://gnosischain-rpc.gateway.pokt.network",
        "https://gnosis.drpc.org",
        "https://1rpc.io/gnosis",
      ],
      chainName: "Gnosis",
      nativeCurrency: {
        name: "xDai",
        symbol: "xDai",
        decimals: 18,
      },
      blockExplorerUrls: ["https://gnosisscan.io"],
    },
  },
  {
    //network: "Avalanche C-Chain",
    network: "Avalanche",
    chainId: 43114,
    currency: "AVAX",
    decimals: 18,
    logoURI: "https://app.1inch.io/assets/images/network-logos/avalanche.svg",
    changeNetworkParam: {
      chainId: "0xa86a",
      rpcUrls: [
        "https://rpc.ankr.com/avalanche",
        "https://avalanche.drpc.org",
        "https://avalanche.blockpi.network/v1/rpc/public",
        "https://api.avax.network/ext/bc/C/rpc",
        "wss://avalanche-c-chain.publicnode.com",
      ],
      chainName: "Avalanche",
      nativeCurrency: {
        name: "AVAX",
        symbol: "AVAX",
        decimals: 18,
      },
      blockExplorerUrls: ["https://snowtrace.io"],
    },
  },
  {
    //network: "Fantom Opera",
    network: "Fantom",
    chainId: 250,
    currency: "FTM",
    decimals: 18,
    logoURI: "https://app.1inch.io/assets/images/network-logos/fantom.svg",
    changeNetworkParam: {
      chainId: "0xFA",
      rpcUrls: [
        "https://fantom.blockpi.network/v1/rpc/public",
        "https://fantom-mainnet.public.blastapi.io",
        "wss://fantom.publicnode.com",
        "https://fantom-pokt.nodies.app",
        "https://1rpc.io/ftm",
        "https://rpc.ftm.tools",
      ],
      chainName: "Fantom",
      nativeCurrency: {
        name: "FTM",
        symbol: "FTM",
        decimals: 18,
      },
      blockExplorerUrls: ["https://ftmscan.com"],
    },
  },
  {
    //network: "Klaytn Mainnet Cypress",
    network: "Klaytn",
    chainId: 8217,
    currency: "KLAY",
    decimals: 18,
    logoURI: "https://app.1inch.io/assets/images/network-logos/klaytn.svg",
    changeNetworkParam: {
      chainId: "0x2019",
      rpcUrls: [
        "https://1rpc.io/klay",
        "https://klaytn.blockpi.network/v1/rpc/public",
        "https://public-node-api.klaytnapi.com/v1/cypress",
      ],
      chainName: "Klaytn Mainnet Cypress",
      nativeCurrency: {
        name: "KLAY",
        symbol: "KLAY",
        decimals: 18,
      },
      blockExplorerUrls: ["https://ftmscan.com"],
    },
  },
  {
    //network: "Aurora Mainnet",
    network: "Aurora",
    chainId: 1313161554,
    currency: "ETH",
    decimals: 18,
    logoURI: "https://app.1inch.io/assets/images/network-logos/aurora.svg",
    changeNetworkParam: {
      chainId: "0x4E454152",
      rpcUrls: [
        "https://mainnet.aurora.dev",
        "https://1rpc.io/aurora",
        "https://endpoints.omniatech.io/v1/aurora/mainnet/public",
        "https://aurora.drpc.org",
      ],
      chainName: "Aurora",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
      blockExplorerUrls: ["https://aurorascan.dev"],
    },
  },
];

const SUPPORTED_CHAIN_IDS = NETWORKS_AVAILABLE.map(
  (network) => network.chainId
);

const PLATFORM_OWNER = "0x94343086a9E6Fa7f7df421308C7DDE131BA25bAd";

const PLATFORM_FEE = "3"; // 3% fee (max is 3% and min is 0% on 1inch.io)

export const getNetworkData = (chainId) => {
  return NETWORKS_AVAILABLE.find((network) => network.chainId === chainId);
};

export {
  NETWORKS_AVAILABLE,
  SUPPORTED_CHAIN_IDS,
  PLATFORM_OWNER,
  PLATFORM_FEE,
};
