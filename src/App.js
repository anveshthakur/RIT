import logo from './logo.svg';
import './App.css';
import {useAddress, useContract, useMetamask} from '@thirdweb-dev/react';
import { ethers } from 'ethers';

function App() {

  const connectWithMetamask = useMetamask();
  const address = useAddress();
  const { contract } = useContract(process.env.REACT_APP_CONTRACT_ADDRESS, "nft-drop")

  const claimNft = async() => {
    try {
      const tx = await contract.claimTo(address, 1); //address,  quantity
      console.log(tx[0].receipt.blockHash)
      console.log(tx[0].receipt.transactionHash);
    } catch (error) {
      console.trace(error)
    }
  }

  const addNetwork = async () => {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: ethers.utils.hexlify(137),
          chainName: "Polygon Mainnet",
          rpcUrls: ["https://polygon-rpc.com"],
          blockExplorerUrls: ["https://polygonscan.com"],
          nativeCurrency: {
            name: 'MATIC',
            symbol: 'MATIC',
            decimals: 18
          },
        },
      ],
    });
    window.location.reload();
  };

  // const balanceOf = async() => {
  //   try {
  //     const tx = await contract.balanceOf(address);
  //     console.log(tx.toNumber());
  //   }catch(error){
  //     console.log(error)
  //   }
  // }

  return (
    <div className="App">
      <header className="App-header">
      <div className="addnetwork" style={{
        width: "100%", 
        display: "flex", 
        justifyContent: "flex-end",
        marginRight: "20vw",
        }}>
        <button style={{
          borderRadius: "10px", 
          border: "0px",
          cursor: "pointer",
          }}
          onClick={addNetwork}
          >
        🔴 Add Polygon to Metamask!</button>
      </div>
      <img src={logo} className="App-logo" alt="logo" />
        {address ? address : <button onClick={connectWithMetamask}>Connect</button>}
        <br />
        <br />
        {address && <button onClick={claimNft}> Claim Nft </button>}
        <br />
        {/* {address && <button onClick={balanceOf}> See Balance </button>} */}
      </header>
    </div>
  );
}

export default App;
