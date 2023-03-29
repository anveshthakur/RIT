import { useAddress, useMetamask } from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import { BsTwitter, BsInstagram } from "react-icons/bs";
import "./OpenseaPage.css";
import { contract_ownerOf, tokensOfOwner } from "../Blockchain/opensea";
import opensea from "../../logos/opensea.png";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const OpenseaPage = () => {
  let contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
  const address = useAddress();
  let openseadef = "https://opensea.io/assets/matic";
  let metaMaskConnect = useMetamask();

  const [token, setToken] = useState();
  const [loading, setLoading] = useState(true);
  const [searchParams, _] = useSearchParams();

  useEffect(() => {
    metaMaskConnect();
    if (searchParams.get("tokenId")) {
      setToken(searchParams.get("tokenId"));
      setTimeout(() => {
        setLoading(false);
      }, 1000)
    } else {
      
      const URL = `https://api.polygonscan.com/api?module=account&action=tokennfttx&contractaddress=0x4694b1c3734e9dd182f58ae74d204d6e7e9a1a97&address=${address}&startblock=0&endblock=99999999&page=1&offset=100&sort=asc&apikey=G5C32S5CUJVPB15EVWECNUH12MMHQK8FD7`
      
      address && axios.get(URL)
            .then((res) => {
                  const data=(res.data.result)
                  console.log(data)  
                data.map(async(item, key)=>{
                  console.log(item)
                  const owner = await contract_ownerOf(item.tokenID);
                  if(owner == address){
                      setToken(item.tokenID);
                  }
                })
                setTimeout(() => {
                  setLoading(false);
                }, 1000)
            })
            .catch((err) => {
                setTimeout(() => {
                  setLoading(false);
                }, 1000)
                console.log(err);
            })
    }
  }, [address]);

  return !loading ? (
    <>
      <Header connectWithMetamask={metaMaskConnect} address={address} />
      {token || token === 0 ? (
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
              YOU HAVE MINTED A TOKEN WITH THIS ADDRESS. CHECK YOUR NFT OVER
              HERE.
            </h2>
          </div>
          <div className="opensea">
            <div>
              <img src={opensea} alt="opensea"></img>
            </div>
            <div>
              <a
                target="__blank"
                href={`${openseadef}/${contractAddress}/${token}`}
              >
                VIEW ON OPENSEA
              </a>
            </div>
          </div>
        </div>
      ) : (
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
              VISIT OUR STALL TO CLAIM YOUR NFT IN PERSON. CHECK THE NFT
              COLLECTION
            </h2>
          </div>
          <div className="opensea">
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
      )}
      <div className="socials1">
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
      <div className="dots_lines desktop">
        <div
          className="sq"
          style={{ position: "absolute", left: "12.40vw", top: "93vh" }}
        ></div>
        <div
          className="sq"
          style={{
            position: "absolute",
            left: "12.40vw",
            top: "93vh",
            marginLeft: "15px",
          }}
        ></div>

        <div
          className="sq"
          style={{
            position: "absolute",
            left: "43.5vw",
            top: "18.2vh",
            width: "8px",
            height: "8px",
          }}
        ></div>

        <div
          className="sq"
          style={{
            position: "absolute",
            left: "79.5vw",
            top: "30.5vh",
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
            left: "15.3vw",
            top: "70.6vh",
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
    </>
  ) : (
    <div className="loader"></div>
  );

  // LOADER ^
};

export default OpenseaPage;
