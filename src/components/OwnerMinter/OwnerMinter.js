import React, { useRef, useState } from "react";
import Html5QrcodePlugin from "./Html5QrcodePlugin.jsx";
import Header from "../header/Header.js";
// import {QrReader}  from 'react-qr-reader';

const OwnerMinter = ({ claimNft }) => {
  const [Scan, setScan] = useState(false);
  const [result, setResult] = useState("");
  const address = useRef("");

  const previewStyle = {
    height: "240px",
    width: "240px",
  };

  const onNewScanResult = (decodedText, decodedResult) => {
    console.log(decodedText);
  };

  return (
    // <div className="App">
    //   <header className="App-header">
    //     <h1>Owner Mint</h1>
    //     address: <input type="text" ref={address} />
    //     <br />
    //     <button onClick={() => claimNft(address.current.value)}>Send To!</button>
    //     <br />
    //     <button onClick={() => setScan(prev => !prev)}>
    //       Scan
    //     </button>

    //     {/* {Scan &&
    //       <div style={previewStyle}>
    //       <QrReader
    //       delay={300}
    //       onResult={(result, error) => {
    //         !!result && console.log(result?.text);
    //         !!error && console.log(error);
    //     }}
    //     />
    //     </div>
    //     }  */}

    //       <Html5QrcodePlugin
    //             fps={10}
    //             qrbox={250}
    //             disableFlip={false}
    //             qrCodeSuccessCallback={onNewScanResult}/>

    //   </header>
    // </div>
    <>
      <Header />
      <div>
        <input type="text" placeholder="Enter Your email address"></input>
        <span></span>
      </div>
      <div>
        <input type="text" placeeholder="enter your wallet address"></input>
      </div>
    </>
  );
};

export default OwnerMinter;
