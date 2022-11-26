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

  // const url = "https://api.nfthing.com/onsite";
  // const url = "http://localhost:5000/registerdata";
  const url = "http://192.168.172.158:5000/owner";

  const handlePull = () => {
    const requestOptions = {
      // mode: 'no-cors',
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // email: email,
        slno: slno,
      }),
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => responses(data));
  };

  const responses = (data) => {
    console.log(data);
    document.getElementById("address").value = data.walletAddress;
  };

  const mintAndCheck = async () => {
    claimNft(walletAddress);
  };

  return (
    <>
      <Header connectWithMetamask={connectWithMetamask} address={address} />
      <div className="owner-main">
        <div className="owner-frame"></div>
        <div className="scanner">
          <input
            id="slno"
            className="walletId"
            placeholder="Sl No"
            onChange={(e) => setSlno(e.target.value)}
          />
        </div>
        <button className="pull" onClick={handlePull}>
          Pull wallet address
        </button>
        <input
          id="address"
          placeholder="Wallet address"
          onChange={(e) => setwalletAddress(e.target.value)}
        />
        <div>
          <input
            type="submit"
            className="o-mintbtn"
            onClick={mintAndCheck}
            placeholder="Mint"
          />
        </div>
      </div>
    </>
  );
};

export default OwnerMinter;
