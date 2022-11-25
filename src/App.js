import "./App.css";
import { Routes, Route } from "react-router-dom";
import OwnerMinter from "./components/OwnerMinter/OwnerMinter";
import { useAddress, useContract, useMetamask } from "@thirdweb-dev/react";
import { TestPage } from "./components/TestPage/TestPage";
import OpenseaPage from "./components/OpenseaPage/OpenseaPage";
import { contract_balanceOf } from "./components/Blockchain/opensea";
import { useEffect, useState } from "react";
import ChromePage from "./components/ChromePage/ChromePage";

function App() {
  const [metabrowser, setMetabrowser] = useState(false);
  const [isChrome, setIsChrome] = useState(false);
  const [balance, setBalance] = useState();
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState(false);
  const metaMaskConnect = useMetamask();
  const address = useAddress("0x");

  useEffect(() => {
    // window
    //   .matchMedia("(max-width: 500px)")
    //   .addEventListener("change", (e) => setMatches(e.matches));
    // console.log(matches)
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
    console.log(metabrowser);
  });

  useEffect(() => {
    if (matches && !metabrowser) {
      setIsChrome(true);
    }
  });

  useEffect(() => {
    !isChrome && metaMaskConnect();
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

  const claimNft = async (address) => {
    try {
      setLoading(true);
      await contract.claimTo(address, 1).then((res) => {
        setLoading(false);
        console.log(res[0].receipt.transactionHash);
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Routes>
      <Route path="/ownerMint" element={<OwnerMinter claimNft={claimNft} />} />
      <Route
        path="/"
        element={
          !isChrome ? (
            balance ? (
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
    </Routes>
  );
}

export default App;
