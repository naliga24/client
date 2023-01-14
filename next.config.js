/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
  },
  reactStrictMode: true,
  trailingSlash: true,
  // basePath: '/app',
  env: {
    // MORALIS_APP_ID: "YWZn3WQiCiWCJSqkMpjU1JdrwiDaXrQTFjKEpSIY",
    // MORALIS_SERVER_URL: "https://pxlcw9zmhyxv.usemoralis.com:2053/server",
    BACKEND_BASE_URL: process.env.NODE_ENV === 'development' ? "http://localhost:3031/api/v1" : "https://api.dev.swap.com/api/v1",
  },
  eslint: {
    dirs: ['pages', 'context', 'api', 'components', 'theme', 'lib'], // Only run ESLint on directories during production builds (next build)
  },
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  experimental: {
    // Enables the styled-components SWC transform
    styledComponents: true
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
