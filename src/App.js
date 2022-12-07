import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import OwnerMinter from "./components/OwnerMinter/OwnerMinter";
import { useAddress, useContract, useMetamask } from "@thirdweb-dev/react";
import { TestPage } from "./components/TestPage/TestPage";
import OpenseaPage from "./components/OpenseaPage/OpenseaPage";
import { contract_balanceOf } from "./components/Blockchain/opensea";
import { useEffect, useState } from "react";
import ChromePage from "./components/ChromePage/ChromePage";
import axios from "axios";

function App() {
  const [metabrowser, setMetabrowser] = useState(false);
  const [isChrome, setIsChrome] = useState(false);
  const [balance, setBalance] = useState();
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState(false);

  const metaMaskConnect = useMetamask();
  const address = useAddress();
  let contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
  let openseadef = "https://opensea.io/assets/matic";
  let polygonLink = "https://polygonscan.com";
  const navigate = useNavigate();

  useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      return setMatches(true);
    } else {
      setMatches(false);
    }
  });

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setMetabrowser(true);
    }
  });

  useEffect(() => {
    if (matches && !metabrowser) {
      setIsChrome(true);
    }
  });

  useEffect(() => {
    !isChrome && metaMaskConnect().then((res) => window.location.reload);
  }, []);

  useEffect(() => {
    async function getBalance() {
      address &&
        (await contract_balanceOf(address).then((res) => {
          setBalance(res);
          setLoading(false);
        }));
    }
    getBalance();
  }, [address]);

  const { contract } = useContract(
    process.env.REACT_APP_CONTRACT_ADDRESS,
    "nft-drop"
  );

  const makeApiCall = async (addressFor, tokenId, txHash) => {
    const body = {
      address: addressFor,
      tokenId: `${openseadef}/${contractAddress}/${tokenId}`,
      txHash: `${polygonLink}/tx/${txHash}`
    };
    console.log(body);
    await axios.post("https://apitest.nfthing.com/successfulmint", body)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  const claimNft = async (address) => {
    try {
      setLoading(true);
      await contract.claimTo(address, 1)
      .then((res) => {
        const transactionHash = res[0].receipt.transactionHash
        const tokenId = res[0].receipt.logs[0].topics[3];
        console.log("Making the API call");
        makeApiCall(address, parseInt(Number(tokenId)), transactionHash)
        setLoading(false);
        navigate({
          pathname: "/opensea",
          search: `?tokenId=${parseInt(Number(tokenId))}`
        })
      });
    } catch (error) {
      setLoading(false);
      console.log(error); //SOMETHING WENT WRONG BUTTON MAYBE
    }
  };

  return (
    <Routes>
      <Route path="/owner" element={<OwnerMinter claimNft={claimNft} />} />
      <Route
        path="/"
        element={
          !isChrome ? (
            // balance ? 
            false ?
            (
              <OpenseaPage />
            ) : (
              <TestPage claimNft={claimNft} loading={loading} />
            )
          ) : (
            <ChromePage />
          )
        }
      />
      <Route path="/mobile" element={<ChromePage />} />
      <Route path="/opensea" element={<OpenseaPage />} />
    </Routes>
  );
}

export default App;
