import axios from "../lib/axios";


const getTokensByChainId = async ({ chainId }) => {
  try {
    const response = await axios.get(
      `/token/getTokensByChainId?chainId=${chainId}`,
      {
        validateStatus: function () {
          return true;
        },
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getTokenByAddress = async ({chainId, address}) => {
  try {
    const response = await axios.get(
      `/token/getTokenByAddress?chainId=${chainId}&address=${address}`,
      {
        validateStatus: function () {
          return true;
        },
      }
    );
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export {
  getTokensByChainId,
  getTokenByAddress,
};
