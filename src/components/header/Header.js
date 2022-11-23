import React from "react";
import "./Header.css";
import nfthing from "../../logos/Group 1.png";
import vector from "../../logos/Vector.png";
import { Link } from "react-router-dom";
import { AiOutlineDown } from "react-icons/ai";

const Header = () => {
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
          <h3>ADD POLYGON TO METAMASK ˅</h3>
        </div>
        <div className="down">
          <h3>ADD POLYGON TO METAMASK </h3>
          <h3>SWITCH TO POLYGON</h3>
        </div>
      </div>
      <div className="button">
        <button>Connect Wallet</button>
      </div>
    </nav>
  );
};

export default Header;
