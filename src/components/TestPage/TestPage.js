import React from "react";
import Header from "../header/Header";
import "./TestPage.css";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

export const TestPage = () => {
  return (
    <>
      <Header />
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
            <div className="counter-button">
              <AiOutlineMinus />
            </div>
            <div className="count">
              <h2>0</h2>
            </div>
            <div className="counter-button">
              <AiOutlinePlus />
            </div>
            <div className="counter">
              <h3 className="mintbtn">MINT NOW</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
