import { useAddress, useMetamask } from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import { BsTwitter, BsInstagram } from "react-icons/bs";
import "./OpenseaPage.css";
import { tokensOfOwner } from "../Blockchain/opensea";
import opensea from "../../logos/opensea.png";

const OpenseaPage = () => {
  let contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
  const address = useAddress();
  let openseadef = "https://opensea.io/assets/matic";

  let metaMaskConnect = useMetamask();

  const [token, setToken] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getToken() {
      await tokensOfOwner(address)
      .then(res => {
        setToken(res)
        setLoading(false);
      })
      .catch(err => console.log(err));
      metaMaskConnect();
    }
    getToken();
  }, [address]);

  return (
    !loading ? 
    <>
      <Header connectWithMetamask={metaMaskConnect} address={address} />
      <div className="main1">
        <div className="frame-bar">
          <div className="square"></div>
          <h3>MINT SUCCESSFUL </h3>
        </div>
        <div className="congo">
          <h1>CONGRATULATIONS!</h1>
        </div>
        <div className="info">
            <h2>
              YOU HAVE NOT MINTED A TOKEN WITH THIS ADDRESS. CHECK THE NFT COLLECTION 
            </h2>
        </div>
        <div className="socials1">
          <div>
            <img src={opensea} alt="opensea"></img>
          </div>
          <div>
              <a href={`${openseadef}/${contractAddress}/${token}`}>
                VIEW ON OPENSEA
              </a>
          </div>
        </div>
      </div>
      <div class="dots_lines desktop">
        <div
          class="sq"
          style={{ position: "absolute", left: "8.3vw", top: "33.5vh" }}
        ></div>
        <div
          class="sq"
          style={{ position: "absolute", left: "42.5vw", top: "18.8vh" }}
        ></div>
        <div
          class="sq"
          style={{ position: "absolute", left: "83.6vw", top: "28.5vh" }}
        ></div>
        <div
          class="sq"
          style={{ position: "absolute", left: "92vw", top: "73.3vh" }}
        ></div>
        <div
          class="sq"
          style={{
            position: "absolute",
            left: "92vw",
            top: "73.3vh",
            marginLeft: "15px",
          }}
        ></div>
        <div
          class="sq"
          style={{
            position: "absolute",
            left: "19.8vw",
            top: "55vh",
            width: "8.3vw",
            maxWidth: "160px",
            transform: "rotate(90deg)",
          }}
        ></div>
        <div
          class="sq"
          style={{
            position: "absolute",
            right: "15vw",
            top: "39vh",
            width: "8.3vw",
            maxWidth: "160px",
          }}
        ></div>

        <div
          class="4square"
          style={{
            display: "block",
            position: "absolute",
            left: "6.35vw",
            top: "89.1vh",
          }}
        >
          <div style={{ display: "flex" }}>
            <div class="sq3" style={{ position: "unset" }}></div>
            <div
              class="sq3"
              style={{ marginLeft: "3px", position: "unset" }}
            ></div>
          </div>

          <div style={{ display: "flex", marginTop: "3px" }}>
            <div class="sq3" style={{ position: "unset" }}></div>
            <div
              class="sq3"
              style={{ marginLeft: "3px", position: "unset" }}
            ></div>
          </div>
        </div>
        <div
          class="4square"
          style={{
            display: "block",
            position: "absolute",
            left: "40.3vw",
            top: "89.5vh",
          }}
        >
          <div style={{ display: "flex" }}>
            <div class="sq3" style={{ position: "unset" }}></div>
            <div
              class="sq3"
              style={{ marginLeft: "3px", position: "unset" }}
            ></div>
          </div>

          <div style={{ display: "flex", marginTop: "3px" }}>
            <div class="sq3" style={{ position: "unset" }}></div>
            <div
              class="sq3"
              style={{ marginLeft: "3px", position: "unset" }}
            ></div>
          </div>
        </div>
        <div
          class="4square"
          style={{
            display: "block",
            position: "absolute",
            left: "74.3vw",
            top: "73.3vh",
          }}
        >
          <div style={{ display: "flex" }}>
            <div class="sq3" style={{ position: "unset" }}></div>
            <div
              class="sq3"
              style={{ marginLeft: "3px", position: "unset" }}
            ></div>
          </div>

          <div style={{ display: "flex", marginTop: "3px" }}>
            <div class="sq3" style={{ position: "unset" }}></div>
            <div
              class="sq3"
              style={{ marginLeft: "3px", position: "unset" }}
            ></div>
          </div>
        </div>
        <div
          class="linedot"
          style={{
            position: "absolute",
            left: "47px",
            top: "54.7vh",
            transform: "rotate(90deg)",
          }}
        >
          <div class="linethin"></div>
          <div class="sq3" style={{ top: "-59px" }}></div>
          <div class="sq3" style={{ top: "-71px", marginBottom: "12px" }}></div>
        </div>
        <div
          class="linedot"
          style={{
            position: "absolute",
            left: "73.9vw",
            bottom: "47px",
            transform: "rotate(0deg)",
          }}
        >
          <div class="linethin"></div>
          <div class="sq3" style={{ top: "-59px" }}></div>
          <div class="sq3" style={{ top: "-71px", marginBottom: "12px" }}></div>
        </div>
      </div>
    </>
  : <h1>loading</h1>);

  // LOADER ^
};

export default OpenseaPage;
