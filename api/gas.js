import axios from "../lib/axios";

const getGasPriceByChainId = async ({ chainId }) => {
  try {
    const response = await axios.get(
      `/gas/getGasPriceByChainId?chainId=${chainId}`,
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

export { getGasPriceByChainId };
