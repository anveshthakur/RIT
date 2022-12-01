import { ethers } from "ethers";

export const changeNetwork = async(params) => {
    const chainId = 137;
    if (window.ethereum.networkVersion != chainId) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: ethers.utils.hexValue(chainId) }],
        });
      } catch (error) {
        if (error.code === 4902) {
          const res = await addNetwork();
          return res;
        }
        console.log(error);
      }
    }
  }

const addNetwork = async () => {
    try{
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: ethers.utils.hexlify(137),
            chainName: "Polygon Mainnet",
            rpcUrls: ["https://polygon-rpc.com"],
            blockExplorerUrls: ["https://polygonscan.com"],
            nativeCurrency: {
              name: "MATIC",
              symbol: "MATIC",
              decimals: 18,
            },
          },
        ],
      })
      window.location.reload();
    } catch(err){
      return err.code;
    }    
  };