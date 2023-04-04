import React, { useEffect, useState } from "react";
import nfthing from "../../logos/Group 1.png";
import "./ChromePage.css";
import { BsTwitter, BsInstagram } from "react-icons/bs";

const ChromePage = () => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    Copy();
  }, []);
  const Copy = () => {
    var copyTextareaBtn = document.querySelector(".copy-button");

    copyTextareaBtn.addEventListener("click", function (event) {
      var copyTextarea = document.querySelector(".copy-text");
      copyTextarea.focus();
      copyTextarea.select();

      try {
        var successful = document.execCommand("copy");
        var msg = successful ? "successful" : "unsuccessful";
        console.log("Copying text command was " + msg);
        setCopied(true);
      } catch (err) {
        console.log("Oops, unable to copy");
      }
    });
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
              <textarea className="copy-text" readOnly>
                rit.nfthing.com
              </textarea>
              <div className="copy-button">
                <h4>{copied ? "Copied" : "Copy link"}</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="metamask">
          <a
            className="deeplink"
            href="https://metamask.app.link/dapp/minting-dapp-42401.web.app/"
          >
            OPEN METAMASK
          </a>
        </div>
        <div className="socialsChrome mob">
          <div class="gentext">
            {" "}
            //GENERATING <br></br> SOCIAL LINKS FROM INDEX
          </div>
          <h2>FOLLOW US ON</h2>
          <div className="links">
            <a href="https://twitter.com/NFThing_" target="_blank">
              <BsTwitter className="icon" /> <p>TWITTER</p>
            </a>
            <a
              href="https://instagram.com/nfthing_?igshid=YmMyMTA2M2Y="
              target="_blank"
            >
              <BsInstagram className="icon" /> <p>INSTAGRAM</p>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChromePage;
