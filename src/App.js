import "./App.css";
import { Routes, Route } from "react-router-dom";
import OwnerMinter from "./components/OwnerMinter/OwnerMinter";
import MainPage from "./components/MainPage/MainPage";
import { useAddress, useContract } from "@thirdweb-dev/react";
import { TestPage } from "./components/TestPage/TestPage";
import OpenseaPage from "./components/OpenseaPage/OpenseaPage";

function App() {

  const { contract } = useContract(
    process.env.REACT_APP_CONTRACT_ADDRESS,
    "nft-drop"
  );

  const claimNft = async (address) => {
    try {
      const tx = await contract.claimTo(address, 1); //address,  quantity
      console.log(tx[0].receipt.blockHash);
      console.log(tx[0].receipt.transactionHash);
      alert("Minting Complete!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Routes>
      <Route path="/ownerMint" element={<OwnerMinter claimNft={claimNft} />} />
      <Route path="/" element={<MainPage claimNft={claimNft} />} />
      <Route path="/opensea" element={ <OpenseaPage token = {1} /> } />
      <Route path="/test" element={ <TestPage claimNft={claimNft} />} />
    </Routes>
  );
}

export default App;
