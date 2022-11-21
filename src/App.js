import './App.css';
import { useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';
import OwnerMinter from './components/OwnerMinter/OwnerMinter';
import MainPage from './components/MainPage/MainPage';
import { useContract } from '@thirdweb-dev/react';

function App() {

  const OPEN_SEA = "https://opensea.io/collection/rit-hackathon";
  const { contract } = useContract(process.env.REACT_APP_CONTRACT_ADDRESS, "nft-drop");


  useEffect(() => {
    console.log(`I know front-end is bad 😿, You can go to the NFT collection from here 👉 ${OPEN_SEA}`)
  }, [])
  

  const claimNft = async(address) => {
    try {
      const tx = await contract.claimTo(address, 1); //address,  quantity
      console.log(tx[0].receipt.blockHash)
      console.log(tx[0].receipt.transactionHash);
      alert("Minting Complete!");
    } catch (error) {
      alert("Are you allowed to mint NFTs? / Are You trying to mint more than 1 NFT?");
      console.log(error)
    }
  }

  return (
    <Routes>
          <Route path="/ownerMint" element = {<OwnerMinter claimNft={claimNft} />} />
          <Route path="/" element = {<MainPage claimNft={claimNft} />} />
      </Routes>
  );
}

export default App;
