import React, { useEffect, useState } from "react";
import "./Header.css";
import nfthing from "../../logos/Group 1.png";
import vector from "../../logos/Vector.png";
import { Link } from "react-router-dom";
import polygon from "../../logos/polygon.png";
import { changeNetwork } from '../Blockchain/networkMethods';
import { useWalletConnect } from "@thirdweb-dev/react";

const Header = ({ 
  connectWithMetamask, 
  address,
  errLoad,
  isMobile
  }) => {
  const [errMsg, setErrMsg] = useState(true);

  const checkNetwork = async() => {    
    try{
      address && window.ethereum.networkVersion != 137 && await changeNetwork();
      setErrMsg(false)
    }
    catch(err){
      err?.code === 4001 && setErrMsg(true)
    }
  }
  
  useEffect(() => {
    checkNetwork();
  }, [address])

  return (
    <nav className="navbar">
      <div
        className="page-error"
        style={{ visibility: errMsg || errLoad
          ? "visible" 
          : "hidden" }}
      >
        <h1>PLEASE CONNECT TO POLYGON NETWORK</h1>
        <button onClick={() => changeNetwork(isMobile)}>
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
