/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = withPWA({
  reactStrictMode: true,
  trailingSlash: true,
  // basePath: '/app',
  env: {
    // MORALIS_APP_ID: "YWZn3WQiCiWCJSqkMpjU1JdrwiDaXrQTFjKEpSIY",
    // MORALIS_SERVER_URL: "https://pxlcw9zmhyxv.usemoralis.com:2053/server",
    REACT_APP_BNB_RPC_URL: "https://snowy-clean-shadow.bsc.discover.quiknode.pro/62b8280daa03c09c4e4b6348ff05d0e792c95d2c/",
    REACT_APP_INFURA_KEY: "1b6b3ac62a9e424e89de9a4332b8f803", //https://app.infura.io/dashboard/ethereum/1b6b3ac62a9e424e89de9a4332b8f803/settings/endpoints
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
