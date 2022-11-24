import React, { useEffect, useState } from "react";
import "./Header.css";
import nfthing from "../../logos/Group 1.png";
import vector from "../../logos/Vector.png";
import { Link } from "react-router-dom";
import { AiOutlineDown } from "react-icons/ai";
import { ethers } from "ethers";
import polygon from "../../logos/polygon.png";

const Header = ({ connectWithMetamask, address }) => {
  const [error, setError] = useState(false);
  async function changeNetwork(params) {
    const chainId = 137;
    if (window.ethereum.networkVersion !== chainId) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: ethers.utils.hexValue(chainId) }],
        });
      } catch (error) {
        if (error.code === 4902) {
          addNetwork();
        }
        console.log(error);
      }
    }
  }

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

  useEffect(() => {
    changeNetwork();
  }, []);

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
    <nav className="navbar">
      <div
        className="page-error"
        style={{ visibility: error ? "visible" : "hidden" }}
      >
        <h1>PLEASE CONNECT TO POLYGON NETWORK</h1>
        <button>
          <img src={polygon}></img>
        </button>
      </div>
      <div className="main-navbar">
        <div className="logos">
          <img className="vector " src={vector}></img>
          <Link to="/" className="logo">
            <img className="nfthing " src={nfthing} alt="Nfthing" />
          </Link>
        </div>

        <div className="button">
          <button onClick={connectWithMetamask}>
            {address
              ? address.slice(0, 4) + "...." + address.slice(-4)
              : "Connect Wallet"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
