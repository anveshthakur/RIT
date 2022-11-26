import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import "./TestPage.css";
import { BsTwitter, BsInstagram } from "react-icons/bs";
import { useAddress, useMetamask } from "@thirdweb-dev/react";
import { contract_balanceOf, contract_getWhiteListed } from "../Blockchain/opensea";
import { useNavigate } from "react-router-dom";

export const TestPage = ({ claimNft, loading }) => {
  const connectWithMetamask = useMetamask();
  const address = useAddress();
  const navigate = useNavigate();

  const [errLoad, setErrLoad] = useState(false);
  const [whiteListed, setWhiteListed] = useState(false);

  useEffect(() => {
    async function get_allowed() {
      await contract_getWhiteListed(address).then((res) => {
        address && !res && navigate("/opensea");
        setWhiteListed(res);
      });
    }
    console.log(address);
    get_allowed();
  }, [address]);

  const checkAndMint = async () => {
    const chainId = 137;

    !whiteListed && navigate("/opensea");

    if (window.ethereum.networkVersion != chainId) {
      setErrLoad(true);
    } else {
      await claimNft(address)
    }
  };

  return (
    <>
      <Header
        connectWithMetamask={connectWithMetamask}
        address={address}
        errLoad={errLoad}
      />
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
              style={{
                backgroundColor: address && whiteListed ? "black" : "#D6D6D6",
              }}
            >
              {/* disable address button if address is null or undefined */}
              {address && whiteListed ? (
                loading ? (
                  <div
                    style={{ transform: "skew(25deg)", "margin-top": "0.7vh" }}
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
          <div className="socials">
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
      </div>
    </>
  );
};