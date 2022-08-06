import axios from "../lib/axios";
import axiosLib from "axios";

import { coinmarketcap } from "../lib/coinMarketCap";

const getAllTokens = async () => {
  try {
    const response = await axios.get(
      "/token/getTopTokens", 
      {
        validateStatus: function () {
          return true;
        },
      }
    );
    // console.log("response=>", response);
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getAllTokensCoinMarketCap = async () => {
  try {
   const response = await axiosLib.get('https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
      headers: {
        'X-CMC_PRO_API_KEY': coinmarketcap.key,
        'Accepts': 'application/json',
      },
    });

    console.log("response0=>", response);
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export {
  getAllTokens,
  getAllTokensCoinMarketCap,
};
