const NETWORKS_AVAILABLE = [
    {
        //network: "Ethereum Mainnet",
        network: "Ethereum",
        chainId: 1,
        currency: "ETH",
        decimals: 18,
        logoURI: 'https://app.1inch.io/assets/images/network-logos/ethereum.svg',
        changeNetworkParam: {
            chainId: "0x1",
            rpcUrls: ["https://mainnet.infura.io/v3/"],
            chainName: "Ethereum Mainnet",
            nativeCurrency: {
                name: "ETH",
                symbol: "ETH",
                decimals: 18
            },
            blockExplorerUrls: ["https://etherscan.io"]
        }
    },
    {
        //network: "Binance Smart Chain Mainnet",
        network: "BNB Chain",
        chainId: 56,
        currency: "BNB",
        decimals: 18,
        logoURI: 'https://app.1inch.io/assets/images/network-logos/binance-light_2.svg',
        changeNetworkParam: {
            chainId: "0x38",
            rpcUrls: ["https://bsc-dataseed1.ninicoin.io"],
            chainName: "Binance Smart Chain Mainnet",
            nativeCurrency: {
                name: "BNB",
                symbol: "BNB",
                decimals: 18
            },
            blockExplorerUrls: ["https://bscscan.com"]
        }
    },
    {
        //network: "Polygon Mainnet",
        network: "Polygon",
        chainId: 137,
        currency: "MATIC",
        decimals: 18,
        logoURI: 'https://app.1inch.io/assets/images/network-logos/polygon.svg',
        changeNetworkParam: {
            chainId: "0x89",
            rpcUrls: ["https://polygon-rpc.com"],
            chainName: "Polygon Mainnet",
            nativeCurrency: {
                name: "MATIC",
                symbol: "MATIC",
                decimals: 18
            },
            blockExplorerUrls: ["https://polygonscan.com"]
        }
    },
    {
        network: "Optimism",
        chainId: 10,
        currency: "ETH",
        decimals: 18,
        logoURI: 'https://app.1inch.io/assets/images/network-logos/optimism.svg',
        changeNetworkParam: {
            chainId: "0xA",
            rpcUrls: ["https://mainnet.optimism.io"],
            chainName: "Optimism",
            nativeCurrency: {
                name: "ETH",
                symbol: "ETH",
                decimals: 18
            },
            blockExplorerUrls: ["https://optimistic.etherscan.io"]
        }
    },
    {
        //network: "Arbitrum One",
        network: "Arbitrum",
        chainId: 42161,
        currency: "ETH",
        decimals: 18,
        logoURI: 'https://app.1inch.io/assets/images/network-logos/arbitrum.svg',
        changeNetworkParam: {
            chainId: "0xA4B1",
            rpcUrls: ["https://arb1.arbitrum.io/rpc"],
            chainName: "Arbitrum One",
            nativeCurrency: {
                name: "ETH",
                symbol: "ETH",
                decimals: 18
            },
            blockExplorerUrls: ["https://arbiscan.io"]
        }
    },
    {
        network: "Gnosis",
        chainId: 100,
        currency: "xDAI",
        decimals: 18,
        logoURI: 'https://app.1inch.io/assets/images/network-logos/gnosis.svg',
        changeNetworkParam: {
            chainId: "0x64",
            rpcUrls: ["https://gnosischain-rpc.gateway.pokt.network"],
            chainName: "Gnosis",
            nativeCurrency: {
                name: "xDAI",
                symbol: "xDAI",
                decimals: 18
            },
            blockExplorerUrls: ["https://gnosisscan.io"]
        }
    },
    {
        //network: "Avalanche C-Chain",
        network: "Avalanche",
        chainId: 43114,
        currency: "AVAX",
        decimals: 18,
        logoURI: 'https://app.1inch.io/assets/images/network-logos/avalanche.svg',
        changeNetworkParam: {
            chainId: "0xA86A",
            rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
            chainName: "Avalanche",
            nativeCurrency: {
                name: "AVAX",
                symbol: "AVAX",
                decimals: 18
            },
            blockExplorerUrls: ["https://snowtrace.io"]
        }
    },
    {
        //network: "Fantom Opera",
        network: "Fantom",
        chainId: 250,
        currency: "FTM",
        decimals: 18,
        logoURI: 'https://app.1inch.io/assets/images/network-logos/fantom.svg',
        changeNetworkParam: {
            chainId: "0xFA",
            rpcUrls: ["https://rpc.ftm.tools"],
            chainName: "Fantom",
            nativeCurrency: {
                name: "FTM",
                symbol: "FTM",
                decimals: 18
            },
            blockExplorerUrls: ["https://ftmscan.com"]
        }
    },
    {
        //network: "Klaytn Mainnet Cypress",
        network: "Klaytn",
        chainId: 8217,
        currency: "KLAY",
        decimals: 18,
        logoURI: 'https://app.1inch.io/assets/images/network-logos/klaytn.svg',
        changeNetworkParam: {
            chainId: "0x2019",
            rpcUrls: ["https://public-node-api.klaytnapi.com/v1/cypress"],
            chainName: "Klaytn Mainnet Cypress",
            nativeCurrency: {
                name: "KLAY",
                symbol: "KLAY",
                decimals: 18
            },
            blockExplorerUrls: ["https://ftmscan.com"]
        }
    },
    {
        //network: "Aurora Mainnet",
        network: "Aurora",
        chainId: 1313161554,
        currency: "ETH",
        decimals: 18,
        logoURI: 'https://app.1inch.io/assets/images/network-logos/aurora.svg',
        changeNetworkParam: {
            chainId: "0x4E454152",
            rpcUrls: ["https://mainnet.aurora.dev"],
            chainName: "Aurora",
            nativeCurrency: {
                name: "ETH",
                symbol: "ETH",
                decimals: 18
            },
            blockExplorerUrls: ["https://aurorascan.dev"]
        }
    },
];

const SUPPORTED_CHAIN_IDS = NETWORKS_AVAILABLE.map(network=>network.chainId)

const PLATFORM_OWNER = "0x94343086a9E6Fa7f7df421308C7DDE131BA25bAd";

const PLATFORM_FEE = "3"; // 3% fee (max is 3% and min is 0% on 1inch.io)

export const getNetworkData = (chainId) => {
    return NETWORKS_AVAILABLE.find(network => network.chainId === chainId);
  }

export {
    NETWORKS_AVAILABLE,
    SUPPORTED_CHAIN_IDS,
    PLATFORM_OWNER,
    PLATFORM_FEE,
};
