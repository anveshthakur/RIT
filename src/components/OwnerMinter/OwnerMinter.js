import React, { useRef, useState } from 'react'
import Html5QrcodePlugin from './Html5QrcodePlugin.jsx'
// import {QrReader}  from 'react-qr-reader';

const OwnerMinter = ({claimNft}) => {
  
  const [Scan, setScan] = useState(false);
  const [result, setResult] = useState('');  
  const address = useRef("");

  const previewStyle = {
    "height": "240px",
    "width": "240px",
  }

  const onNewScanResult = (decodedText, decodedResult) => {
    console.log(decodedText)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Owner Mint</h1>
        address: <input type="text" ref={address} />
        <br />
        <button onClick={() => claimNft(address.current.value)}>Send To!</button>
        <br />
        <button onClick={() => setScan(prev => !prev)}>
          Scan
        </button>

        {/* {Scan && 
          <div style={previewStyle}>
          <QrReader 
          delay={300}
          onResult={(result, error) => {
            !!result && console.log(result?.text);
            !!error && console.log(error);
        }}
        />
        </div>
        }  */}

          <Html5QrcodePlugin 
                fps={10}
                qrbox={250}
                disableFlip={false}
                qrCodeSuccessCallback={onNewScanResult}/>  


      </header>
    </div>
  )
}

export default OwnerMinter