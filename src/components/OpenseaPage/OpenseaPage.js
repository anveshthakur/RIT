import { useAddress, useMetamask } from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";
import Header from "../header/Header";
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
      {
        token ? (
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
              YOU HAVE MINTED A TOKEN WITH THIS ADDRESS. CHECK YOUR NFT OVER HERE. 
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
        ) 
        
        : (
          <div className="main1">
        <div className="frame-bar">
          <div className="square"></div>
          <h3>NOT WHITELISTED </h3>
        </div>
        <div className="congo">
          <h1>VISIT OUR STALL!</h1>
        </div>
        <div className="info">
            <h2>
              VISIT OUR STALL TO CLAIM YOUR NFT IN PERSON. CHECK THE NFT COLLECTION 
            </h2>
        </div>
        <div className="socials1">
          <div>
            <img src={opensea} alt="opensea"></img>
          </div>
          <div>
              <a href={`https://opensea.io/collection/crypto-legomen`}>
                VIEW ON OPENSEA
              </a>
          </div>
        </div>
      </div>
        )
      }    
      
      <div className="dots_lines desktop">
        <div
          className="sq"
          style={{ position: "absolute", left: "8.3vw", top: "33.5vh" }}
        ></div>
        <div
          className="sq"
          style={{ position: "absolute", left: "42.5vw", top: "18.8vh" }}
        ></div>
        <div
          className="sq"
          style={{ position: "absolute", left: "83.6vw", top: "28.5vh" }}
        ></div>
        <div
          className="sq"
          style={{ position: "absolute", left: "92vw", top: "73.3vh" }}
        ></div>
        <div
          className="sq"
          style={{
            position: "absolute",
            left: "92vw",
            top: "73.3vh",
            marginLeft: "15px",
          }}
        ></div>
        <div
          className="sq"
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
          className="sq"
          style={{
            position: "absolute",
            right: "15vw",
            top: "39vh",
            width: "8.3vw",
            maxWidth: "160px",
          }}
        ></div>

        <div
          className="4square"
          style={{
            display: "block",
            position: "absolute",
            left: "6.35vw",
            top: "89.1vh",
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
        <div
          className="4square"
          style={{
            display: "block",
            position: "absolute",
            left: "40.3vw",
            top: "89.5vh",
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
        <div
          className="4square"
          style={{
            display: "block",
            position: "absolute",
            left: "74.3vw",
            top: "73.3vh",
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
        <div
          className="linedot"
          style={{
            position: "absolute",
            left: "47px",
            top: "54.7vh",
            transform: "rotate(90deg)",
          }}
        >
          <div className="linethin"></div>
          <div className="sq3" style={{ top: "-59px" }}></div>
          <div className="sq3" style={{ top: "-71px", marginBottom: "12px" }}></div>
        </div>
        <div
          className="linedot"
          style={{
            position: "absolute",
            left: "73.9vw",
            bottom: "47px",
            transform: "rotate(0deg)",
          }}
        >
          <div className="linethin"></div>
          <div className="sq3" style={{ top: "-59px" }}></div>
          <div className="sq3" style={{ top: "-71px", marginBottom: "12px" }}></div>
        </div>
      </div>
    </>
  : <div className="loader"></div>);

  // LOADER ^
};

export default OpenseaPage;
