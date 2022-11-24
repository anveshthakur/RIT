import React, { useEffect } from "react";
import "./Header.css";
import nfthing from "../../logos/Group 1.png";
import vector from "../../logos/Vector.png";
import { Link } from "react-router-dom";
import { AiOutlineDown } from "react-icons/ai";
import { ethers } from "ethers";

const Header = ({connectWithMetamask, address}) => {
  
  async function changeNetwork(params) {
    const chainId = 137;
    if (window.ethereum.networkVersion !== chainId) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: ethers.utils.hexValue(chainId) }],
        });
      } catch (error) {
        if(error.code === 4902){
          addNetwork()
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
  }, [])

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
    <nav className="main-navbar">
      <div className="logos">
        <img className="vector " src={vector}></img>
        <Link to="/" className="logo">
          <img className="nfthing " src={nfthing} alt="Nfthing" />
        </Link>
      </div>
      <div className="dropdown">
        <div className="arrow">
          <h3 onClick={addNetwork}>ADD POLYGON TO METAMASK ˅</h3>
        </div>
        <div className="down">
          <h3>ADD POLYGON TO METAMASK </h3>
          <h3 onClick={switchNetwork}>SWITCH TO POLYGON</h3>
        </div>
      </div>
      <div className="button">
        <button onClick={connectWithMetamask}>
          {address ? address.slice(0, 4) + "...." + address.slice(-4) : "Connect Wallet"}
        </button>
      </div>
    </nav>
  );
};

export default Header;
