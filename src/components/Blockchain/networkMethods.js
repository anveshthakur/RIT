import { ethers } from "ethers";

export const changeNetwork = async(isMobile) => {
  const chainId = 137;
  console.log(isMobile);
  if (window.ethereum.networkVersion != chainId) {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: ethers.utils.hexValue(chainId) }],
      })
      .then(res => res == null && window.location.reload());
    }
    catch (switchError) {
      if (isMobile) {
        const errorCode = switchError.data?.originalError?.code
        if (errorCode && errorCode === 4902) {
          await addNetwork()
        }
      } else {
        if (switchError.code === 4902) {
        
          await addNetwork()
        }
    }
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
      throw err
    }    
  };