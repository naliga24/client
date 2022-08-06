/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  basePath: '/app',
  env: {
    MORALIS_APP_ID: "YWZn3WQiCiWCJSqkMpjU1JdrwiDaXrQTFjKEpSIY",
    MORALIS_SERVER_URL: "https://pxlcw9zmhyxv.usemoralis.com:2053/server",
    BACKEND_BASE_URL: "http://localhost:3031/api/v1" || "https://api.dev.swap.com/api/v1",
  },
  eslint: {
    dirs: ['pages', 'api', 'components', 'context', 'lib'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
}
