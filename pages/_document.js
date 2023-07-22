import Document, { Html, Head, Main, NextScript } from "next/document";

const head = {
  title: "3ether.io | DEX",
  description: "DEX",
  name: "3ether.io",
  image: '/android-chrome-192x192.png',
  url: "https://www.3ether.io/",
}
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
          <meta name="theme-color" content="#1a1a1a" />
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