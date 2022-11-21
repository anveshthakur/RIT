import React, { useRef } from 'react'

const OwnerMinter = ({claimNft}) => {
  
  const address = useRef("");

  return (
    <div className="App">
      <header className="App-header">
        <h1>Owner Mint</h1>
        address: <input type="text" ref={address} />
        <br />
        <button onClick={() => claimNft(address.current.value)}>Send To!</button>
      </header>
    </div>
  )
}

export default OwnerMinter