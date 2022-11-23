import logo from "../../logo.svg";
import React from "react";
import { useAddress, useContract, useMetamask } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import Header from "../header/Header";

const MainPage = ({ claimNft }) => {
  const connectWithMetamask = useMetamask();
  const address = useAddress();

  const addNetwork = async () => {
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
    });
    window.location.reload();
  };

  const switchNetwork = async () => {
    const chainId = 137;
    if (window.ethereum.networkVersion !== chainId) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: ethers.utils.hexValue(chainId) }],
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* <Header /> */}
        <div
          className="addnetwork"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            marginRight: "20vw",
          }}
        >
          <button
            style={{
              borderRadius: "10px",
              border: "0px",
              cursor: "pointer",
            }}
            onClick={addNetwork}
          >
            🔴 Add Polygon to Metamask!
          </button>
          <button
            style={{
              borderRadius: "10px",
              border: "0px",
              height: "3vw",
              padding: "10px",
              cursor: "pointer",
              marginLeft: "10px",
            }}
            onClick={switchNetwork}
          >
            🟢 Switch to POLYGON!
          </button>
        </div>
        <img src={logo} className="App-logo" alt="logo" />
        {address ? (
          address
        ) : (
          <button onClick={connectWithMetamask}>Connect</button>
        )}
        <br />
        <br />
        {address && (
          <button onClick={() => claimNft(address)}> Claim Nft </button>
        )}
        <br />
      </header>
    </div>
  );
};

export default MainPage;
