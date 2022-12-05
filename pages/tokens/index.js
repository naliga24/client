import React, { useEffect } from 'react';
//import Layout from "../../components/layout";
import { getAllTokens } from "../../api/token";

export default function Tokens(props) {
  console.log("Tokens=>", props);

  useEffect(() => {
    callGetAllTokensCoinMarketCap();
  }, [])

  const callGetAllTokensCoinMarketCap = async () => {
    try {
      const response = await getAllTokens();
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  return (
    //<Layout>
    <div>
      <h2>Tokens</h2>
      <p>This is Tokens page.</p>
    </div>
   // </Layout>
  );
}

export async function getStaticProps(context) {
  console.log("getStaticProps=>", context);
  return {
    props: {
      data: "kwan",
    }, // will be passed to the page component as props
  }
}

// export async function getStaticPaths(context) {
//   console.log("getStaticPaths=>", context);
//   return {
//     paths: [],
//     fallback: false
// }
// }