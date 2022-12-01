import React, { useEffect, useState } from "react";
import "./Header.css";
import nfthing from "../../logos/Group 1.png";
import vector from "../../logos/Vector.png";
import { Link } from "react-router-dom";
import polygon from "../../logos/polygon.png";
import { changeNetwork } from '../Blockchain/networkMethods';

const Header = ({ 
  connectWithMetamask, 
  address, 
  errLoad }) => {

  const [errMsg, setErrMsg] = useState(errLoad);

  const checkNetwork = async() => {
    let res = await changeNetwork();
    if(res === 4001){
      setErrMsg(true);
    }else{
      setErrMsg(false);
    }
  }

  useEffect(() => {
    checkNetwork();
  }, []);

  useEffect(() => {
  }, [errMsg])

  return (
    <nav className="navbar">
      <div
        className="page-error"
        style={{ visibility: errMsg
          ? "visible" 
          : "hidden" }}
      >
        <h1>PLEASE CONNECT TO POLYGON NETWORK</h1>
        <button onClick={changeNetwork}>
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
