import React, { useState } from "react";
import Header from "../header/Header";
import "./TestPage.css";
import { useAddress, useMetamask } from "@thirdweb-dev/react";

export const TestPage = ({ claimNft, loading }) => {
  
  const connectWithMetamask = useMetamask();
  const address = useAddress();
  
  const [errLoad, setErrLoad] = useState(false);

  const checkAndMint = async() => {
    const chainId = 137;
    if (window.ethereum.networkVersion !== chainId) {
      setErrLoad(true);
    }
    else{
      await claimNft(address);
    }
  }

  return (
    <>
      <Header connectWithMetamask={connectWithMetamask} address={address} errLoad={errLoad} />   
      <div className="frame">
        <div className="left">
          <div className="top">
            <div className="top-f">
              <t className="date">//RIT X NFTHING</t>
            </div>
            <div className="hack">
              <h1>HACKATHON</h1> <h2>EXCLUSIVE NFTS</h2>
            </div>
            <div className="desc">
              This is an RIT x NFTHING hackathon exclusive minter. Connect your
              wallet and mint a 1 of 1 exclusive NFT.
            </div>
          </div>
        </div>
        <div className="right">
          <div className="form-content">
            {/* dont need + - in this */}
            <div className="counter-button">
              {/* <AiOutlineMinus size={"20px"} onClick={amountHandlerMinus} /> */}
            </div>
            <div className="count">
              <h2>1</h2>
            </div>
            <div className="counter-button">
              {/* <AiOutlinePlus size={"20px"} onClick={amountHandlerPlus} /> */}
            </div>
            <div
              className="counter"
              style={{ backgroundColor: address ? "black" : "#D6D6D6" }}
            >
              {/* disable address button if address is null or undefined */}
              {address ? (
                <h3 className="mintbtn" onClick={() => checkAndMint(address)}>
                  {loading ? "Loading" : "MINT NOW"}
                </h3>
              ) : (
                <h3 className="mintbtn">
                  Unavailable
                </h3>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
