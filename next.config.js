/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa");

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
    MORALIS_APP_ID: "YWZn3WQiCiWCJSqkMpjU1JdrwiDaXrQTFjKEpSIY",
    MORALIS_SERVER_URL: "https://pxlcw9zmhyxv.usemoralis.com:2053/server",
    BACKEND_BASE_URL: process.env.NODE_ENV === 'development' ? "https://api.dev.swap.com/api/v1": "http://localhost:3031/api/v1",
  },
  eslint: {
    dirs: ['pages', 'api', 'components', 'context', 'lib'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  experimental: {
    // Enables the styled-components SWC transform
    styledComponents: true
  }
})
