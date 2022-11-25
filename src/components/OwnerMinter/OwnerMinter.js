import React, { useRef, useState } from "react";
import Html5QrcodePlugin from "./Html5QrcodePlugin.jsx";
import Header from "../header/Header.js";
import "./OwnerMinter.css";
// import {QrReader}  from 'react-qr-reader';

const OwnerMinter = ({ claimNft }) => {
  const [email, setEmail] = useState("");
  const [walletAddress, setwalletAddress] = useState(null);
  const [slno, setSlno] = useState(null);
  const [Scan, setScan] = useState(false);
  const [result, setResult] = useState("");
  const address = useRef("");
  const url = "https://api.nfthing.com/Ownermints";

  const previewStyle = {
    height: "240px",
    width: "240px",
  };

  const onNewScanResult = (decodedText, decodedResult) => {
    console.log(decodedText);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id == "email") {
      setEmail(value);
    }
    if (id == "slno") {
      setSlno(value);
    }
    if (id == "address") {
      setwalletAddress(value);
    }
  };

  const handlePull = () => {
    const requestOptions = {
      // mode: 'no-cors',
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        slno: slno,
      }),
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => responses(data));
  };
  const responses = (data) => {
    document.getElementById("address").value = data.walletAddress;
  };



  return (
    <>
      <Header />
      <div className="owner-main">
        <div className="owner-frame">
          <input
            id="email"
            className="own-email"
            type="text"
            placeholder="Enter Your email address"
          ></input>
          <br />
          <span className="own-emailerr" onChange={(e) => handleInputChange(e)}>Enter a right email</span>
        </div>
        <div className="scanner">
          <input id="slno" className="walletId" placeholder="Sl No" onChange={(e) => handleInputChange(e)}></input>
        </div>
        <button className="pull">Pull wallet address</button>
        <input id="address" placeholder="Wallet address" onChange={(e) => handleInputChange(e)}></input>
        <div>
          <input type="submit" className="o-mintbtn" placeholder="Mint"></input>
        </div>
      </div>
    </>
  );
};

export default OwnerMinter;
