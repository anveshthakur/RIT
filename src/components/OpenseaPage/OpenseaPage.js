import { useAddress, useMetamask } from '@thirdweb-dev/react'
import React, { useEffect, useState } from 'react'
import { tokensOfOwner } from '../Blockchain/opensea'

const OpenseaPage = () => {
  
  let contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
  let openseadef = "https://opensea.io/assets/matic"
  let address = useAddress();
  let metaMaskConnect = useMetamask();

  const [token, setToken] = useState();

  useEffect(() => {
    async function getToken(){
      let tok = await tokensOfOwner(address)
      setToken(tok);
      metaMaskConnect();
    }
    getToken();
  }, [address])
  

  return (
    <div>
      {
        token && `${openseadef}/${contractAddress}/${token}`
      } 
    </div>
  )
}

export default OpenseaPage