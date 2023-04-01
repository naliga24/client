/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = withPWA({
  reactStrictMode: true,
  trailingSlash: true,
  // basePath: '/app',
  env: {
    // MORALIS_APP_ID: $MORALIS_APP_ID,
    // MORALIS_SERVER_URL: $MORALIS_SERVER_URL,
    REACT_APP_BNB_RPC_URL: $REACT_APP_BNB_RPC_URL,
    REACT_APP_INFURA_KEY: $REACT_APP_INFURA_KEY, //https://app.infura.io/dashboard/ethereum/
    BACKEND_BASE_URL: process.env.NODE_ENV === 'development' ? "http://localhost:3031/api/v1" : "https://www.api.3ether.io",
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
