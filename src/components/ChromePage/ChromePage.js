import React, { useState } from "react";
import nfthing from "../../logos/Group 1.png";
import "./ChromePage.css";

const ChromePage = () => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
      if (result.state == "granted" || result.state == "prompt") {
        alert("Write access ranted!");
      } else {
        alert("not granted");
      }
    });
    navigator.clipboard.writeText("minting.nfthing.com");
    setCopied(true);
  };
  return (
    <>
      <div className="chrome-page">
        <div className="chrome-header">
          <img src={nfthing}></img>
        </div>
        <div className="chrome-frame">
          <div className="chrome-wel">
            <h1>WELCOME TO NFTHING MINTER LINK!</h1>
          </div>
          <div className="chrome-desc">
            <h3>
              Copy the link below and paste it into your metamask browser to
              access the minter
            </h3>
          </div>
          <div>
            <div className="copy-field">
              <h4>https://minter.nfthing.com</h4>
              <div onClick={copy} className="copy-button">
                <h4>{copied ? "Copied" : "Copy link"}</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="metamask">
          <h2>OPEN METAMASK</h2>
        </div>
        <div className="chrome-socials">
          <h3>generating links</h3>
          <h3>Follow us on</h3>
          <h3> Twitter Instagram</h3>
        </div>
      </div>
    </>
  );
};

export default ChromePage;
