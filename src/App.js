import "./App.css";
import { Routes, Route } from "react-router-dom";
import OwnerMinter from "./components/OwnerMinter/OwnerMinter";
import MainPage from "./components/MainPage/MainPage";
import { useAddress, useContract, useMetamask } from "@thirdweb-dev/react";
import { TestPage } from "./components/TestPage/TestPage";
import OpenseaPage from "./components/OpenseaPage/OpenseaPage";
import { contract_balanceOf } from "./components/Blockchain/opensea";
import { useEffect, useState } from "react";

function App() {
  const [balance, setBalance] = useState();
  const metaMaskConnect = useMetamask();
  const address = useAddress("0x");

  useEffect(() => {
    metaMaskConnect();
  }, []);

  useEffect(() => {
    async function getBalance() {
      address &&
        (await contract_balanceOf(address).then((res) => setBalance(res)));
    }
    getBalance();
  }, [address]);

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
      <Route
        path="/test"
        element={balance ? <OpenseaPage /> : <TestPage claimNft={claimNft} />}
      />
      <Route path="/openSea" element={<OpenseaPage />} />
    </Routes>
  );
}

export default App;
