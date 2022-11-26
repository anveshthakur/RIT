import { useAddress, useMetamask } from "@thirdweb-dev/react";
import React, { useRef, useState } from "react";
import Header from "../header/Header.js";
import "./OwnerMinter.css";

const OwnerMinter = ({ claimNft }) => {
  const connectWithMetamask = useMetamask();
  const address = useAddress();

  const [email, setEmail] = useState("");
  const [walletAddress, setwalletAddress] = useState(null);
  const [slno, setSlno] = useState(null);

  const url = "https://api.nfthing.com/Ownermints";

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

  const mintAndCheck = async() => {
    claimNft(walletAddress);
  }

  return (
    <>
      <Header connectWithMetamask={connectWithMetamask} address={address} />
      <div className="owner-main">
        <div className="owner-frame">
          <input
            id="email"
            className="own-email"
            type="email"
            placeholder="Enter Your email address"
            onChange={(e) => setEmail(e.target.value)}
          />       
          <br />
          <span className="own-emailerr">Enter a right email</span>
        </div>
        <div className="scanner">
          <input id="slno" className="walletId" placeholder="Sl No" onChange={(e) => setSlno(e.target.value)} />
        </div>
        <button className="pull">Pull wallet address</button>
        <input id="address" placeholder="Wallet address" onChange={(e) => setwalletAddress(e.target.value)} />
        <div>
          <input type="submit" className="o-mintbtn" onClick={mintAndCheck} placeholder="Mint" />
        </div>
      </div>
    </>
  );
};

export default OwnerMinter;
