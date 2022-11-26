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

  function copyToClipboard(string) {
    let textarea;
    let result;

    try {
      textarea = document.getElementById("copy-text");
      textarea.setAttribute("readonly", true);
      textarea.setAttribute("contenteditable", true);
      // textarea.style.position = "fixed"; // prevent scroll from jumping to the bottom when focus is set.
      textarea.value = string;

      document.body.appendChild(textarea);

      textarea.focus();
      textarea.select();

      const range = document.createRange();
      range.selectNodeContents(textarea);

      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);

      textarea.setSelectionRange(0, textarea.value.length);
      result = document.execCommand("copy");
    } catch (err) {
      console.error(err);
      result = null;
    }
  }

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
            <div className="copy-field" id="copy-text">
              <h4>https://minter.nfthing.com</h4>
              <div
                // onClick={copyToClipboard("https://rit.nfthing.com/")}
                className="copy-button"
              >
                <h4>{copied ? "Copied" : "Copy link"}</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="metamask">
          <a
            className="deeplink"
            href="https://metamask.app.link/dapp/rit.nfthing.com/"
          >
            OPEN METAMASK
          </a>
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
