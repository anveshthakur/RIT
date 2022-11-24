import React from "react";
import Header from "../header/Header";
import "./TestPage.css";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import { useAddress, useMetamask } from "@thirdweb-dev/react";

export const TestPage = ({ claimNft }) => {
  const connectWithMetamask = useMetamask();
  const address = useAddress();
  const [amount, setAmount] = useState(0);
  const amountHandlerPlus = () => {
    if (amount == 0) {
      setAmount(1);
    }
  };

  const amountHandlerMinus = () => {
    if (amount == 1) {
      setAmount(0);
    }
  };

  return (
    <>
      <Header connectWithMetamask={connectWithMetamask} address={address} />

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
              <AiOutlineMinus size={"20px"} onClick={amountHandlerMinus} />
            </div>
            <div className="count">
              <h2>{amount}</h2>
            </div>
            <div className="counter-button">
              <AiOutlinePlus size={"20px"} onClick={amountHandlerPlus} />
            </div>
            <div
              className="counter"
              style={{ backgroundColor: address ? "black" : "#D6D6D6" }}
            >
              {/* disable address button if address is null or undefined */}
              {address ? (
                <h3 className="mintbtn" onClick={() => claimNft(address)}>
                  MINT NOW
                </h3>
              ) : (
                <h3 className="mintbtn" onClick={() => claimNft(address)}>
                  Unavailable
                </h3>
              )}
            </div>
          </div>

          <div style={{ display: amount == 1 ? "block" : "none" }}>
            ■ MAXIMUM MINT LIMIT REACHED
          </div>
        </div>
      </div>
    </>
  );
};
