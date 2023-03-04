import Document, { Html, Head, Main, NextScript } from "next/document";

const head = {
  title: "3ether.io | DEX",
  description: "DEX",
  name: "3ether.io",
  image: '/icon-512x512.png',
  url: "https://www.3ether.io/",
}
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon-512x512.png"></link>
          <meta name="theme-color" content="#fff" />
          <noscript id="jss-insertion-point"></noscript>
      <meta name="description" content={head.description} />
      <>
    <link rel="canonical" href={head.url} />
    {/* Facebook tags */}
    <meta property="og:locale" content="en_US" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={head.title} />
    <meta property="og:description" content={head.description} />
    <meta property="og:url" content={head.url} />
    <meta property="og:site_name" content={head.name} />
    <meta property="og:image" content={head.image} />
    <meta property="og:image:secure_url" content={head.image} />
    <meta property="og:image:width" content="1024" />
    <meta property="og:image:height" content="683" />
    {/* Twitter tags */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:description" content={head.description} />
    <meta name="twitter:title" content={head.title} />
    <meta name="twitter:image" content={head.image} />
  </>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;