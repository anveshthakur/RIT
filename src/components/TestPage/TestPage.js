import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import "./TestPage.css";
import { BsTwitter, BsInstagram } from "react-icons/bs";
import { useAddress, useMetamask } from "@thirdweb-dev/react";
import { useNavigate } from "react-router-dom";

export const TestPage = ({ claimNft, loading, isMobile, whiteListed }) => {
  const connectWithMetamask = useMetamask();
  const address = useAddress();
  const navigate = useNavigate();

  const [errLoad, setErrLoad] = useState(false);

  useEffect(() => {

    async function check_network(){
      const chainId = 137;
      if (window.ethereum.networkVersion != chainId) {
        setErrLoad(true);
      }else{
        setErrLoad(false);
      }
    }
    
    check_network();
  }, [address, errLoad]);

  const checkAndMint = async () => {
    const chainId = 137;
    !whiteListed && navigate("/opensea");
    if (window.ethereum.networkVersion != chainId) {
      setErrLoad(true);
    } else {
      await claimNft(address);
    }
  };

  return (
    <>
      <Header
        connectWithMetamask={connectWithMetamask}
        address={address}
        errLoad={errLoad}
        isMobile={isMobile}
      />
      <div className="frame">
        <div className="left">
          <div className="top">
            <div className="top-f">
              <span className="date"> w3o/gen1</span>
            </div>
            <div className="hack">
              <h1>web3onwards</h1> <h2>exclusive NFTs</h2>
            </div>
            <div className="desc">
            If you've joint the allowlist for web3onwards, use this dapp to mint your free 1x1 w3o/gen1 NFTs and join the web3onwards community
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
              style={{
                backgroundColor: address && whiteListed && !errLoad ? "black" : "#D6D6D6",
              }}
            >
              {/* disable address button if address is null or undefined */}
              {address && whiteListed && !errLoad ? (
                loading ? (
                  <div
                    style={{ transform: "skew(25deg)", "marginTop": "0.7vh" }}
                  >
                    <div className="loader1"></div>
                  </div>
                ) : (
                  <h3 className="mintbtn" onClick={() => checkAndMint(address)}>
                    Mint now
                  </h3>
                )
              ) : (
                <h3 className="mintbtn">Unavailable</h3>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="dots_lines desktop">
        <div
          className="sq"
          style={{ position: "absolute", left: "12.40vw", top: "95vh" }}
        ></div>
        <div
          className="sq"
          style={{
            position: "absolute",
            left: "12.40vw",
            top: "95vh",
            marginLeft: "15px",
          }}
        ></div>

        <div
          className="sq"
          style={{
            position: "absolute",
            left: "6.5vw",
            top: "28.2vh",
            width: "12px",
            height: "12px",
          }}
        ></div>

        <div
          className="sq"
          style={{
            position: "absolute",
            left: "69.5vw",
            top: "57.5vh",
          }}
        ></div>

        <div
          className="linedot"
          style={{
            position: "absolute",
            right: "47px",
            top: "52.7vh",
            transform: "rotate(270deg)",
          }}
        >
          <div className="linethin"></div>
          <div className="sq3" style={{ top: "-59px" }}></div>
          <div
            className="sq3"
            style={{ top: "-71px", marginBottom: "12px" }}
          ></div>
        </div>

        <div
          className="4square"
          style={{
            display: "block",
            position: "absolute",
            left: "55.3vw",
            top: "57.6vh",
          }}
        >
          <div style={{ display: "flex" }}>
            <div className="sq3" style={{ position: "unset" }}></div>
            <div
              className="sq3"
              style={{ marginLeft: "3px", position: "unset" }}
            ></div>
          </div>

          <div style={{ display: "flex", marginTop: "3px" }}>
            <div className="sq3" style={{ position: "unset" }}></div>
            <div
              className="sq3"
              style={{ marginLeft: "3px", position: "unset" }}
            ></div>
          </div>
        </div>
      </div>
      <div className="squares">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="socials">
        <div className="gentext">
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
    </>
  );
};
