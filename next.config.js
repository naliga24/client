/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = withPWA({
  reactStrictMode: true,
  trailingSlash: true,
  // basePath: '/app',
  env: {
    // NEXT_PUBLIC_MORALIS_APP_ID: process.env.NEXT_PUBLIC_MORALIS_APP_ID,
    // NEXT_PUBLIC_MORALIS_SERVER_URL: process.env.NEXT_PUBLIC_MORALIS_SERVER_URL,
    NEXT_PUBLIC_BNB_RPC_URL: process.env.NEXT_PUBLIC_BNB_RPC_URL,
    NEXT_PUBLIC_INFURA_KEY: process.env.NEXT_PUBLIC_INFURA_KEY, //https://app.infura.io/dashboard/ethereum/1b6b3ac62a9e424e89de9a4332b8f803/settings/endpoints
    NEXT_PUBLIC_ALCHEMY_KEY_ETH_MAINNET: process.env.NEXT_PUBLIC_ALCHEMY_KEY_ETH_MAINNET, //https://dashboard.alchemy.com/
    NEXT_PUBLIC_ALCHEMY_KEY_MATIC_MAINNET: process.env.NEXT_PUBLIC_ALCHEMY_KEY_MATIC_MAINNET, //https://dashboard.alchemy.com/
    BACKEND_BASE_URL: process.env.NODE_ENV === 'development' ? "http://localhost:3032/api/v1" : "https://api.3ether.io/api/v1",
  },
  eslint: {
    dirs: ['pages', 'context', 'api', 'components', 'theme', 'lib', 'hooks', 'redux'], // Only run ESLint on directories during production builds (next build)
  },
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  experimental: {
  },
  images: {
    domains: [
      'tokens.1inch.io',
      'assets.coingecko.com',
      'zapper.fi',
      'ethereum-optimism.github.io',
      'cryptologos.cc',
      'raw.githubusercontent.com',
      'etherscan.io',
      'xion.finance',
      'xdaipunks.com',
      'daodkp.oss-ap-southeast-1.aliyuncs.com',
      'minerva.digital',
      'affinityharmonics.s3.ca-central-1.amazonaws.com',
      'gateway.ipfs.io',
      'snowtrace.io',
      's2.coinmarketcap.com'
    ],
  },
})
