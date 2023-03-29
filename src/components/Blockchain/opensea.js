import { ethers } from 'ethers';
import abi from '../Blockchain/abi.json'

export async function tokensOfOwner(address){
    const contract_addr = process.env.REACT_APP_CONTRACT_ADDRESS;
    const contract = new ethers.Contract(
        contract_addr,
        abi,
        new ethers.providers.Web3Provider(window.ethereum)
    )
    const balanceOf = address && ((await contract.balanceOf(address)).toNumber())
    if(balanceOf === 0){
        return null
    }else{
        let ts = (await contract.totalSupply()).toNumber();
        for (let i = 0; i < ts; i++) {
        let tokenOwner = await contract.ownerOf(i);
        if(tokenOwner === address){
            return i;
        }
    }
    }
}

export async function contract_ownerOf(tokenId){
    const contract_addr = process.env.REACT_APP_CONTRACT_ADDRESS;
    const contract = new ethers.Contract(
        contract_addr,
        abi,
        new ethers.providers.Web3Provider(window.ethereum)
    )
    return await contract.ownerOf(tokenId);
}

export async function contract_balanceOf(address){
    console.log(address);
    const contract_addr = process.env.REACT_APP_CONTRACT_ADDRESS;
    const contract = new ethers.Contract(
        contract_addr,
        abi,
        new ethers.providers.AlchemyProvider("matic", "g-wCwIWjajDiWsIHm-NhJVKnm_aSrb2W")
    )
    return ((await contract.balanceOf(address)).toNumber());
}

export async function contract_getWhiteListed(address){
    const whiteListSet = new Set();
    const snapshot = [
        {addr: "0x7e32d0A406Fb1355335aD0F3E0E7FA99e193B8E7", qty: 1}, 
        {addr: "0xb47dDd00667C6d4223D9e717139251795B9b9a7a", qty: 1}, 
        {addr: "0x920FfE3e9Af437d7A5eB17Ce36EDF4151671c0D3", qty: 1}, 
        {addr: "0xA33D66877f26e7Bc2BaFDa6FB0cab17cab3376f1", qty: 1}, 
        {addr: "0x590C19c43F6830021C442f5F2a1ee1e886291dA4", qty: 1}, 
        {addr: "0x293C2a790cd8ba2A28Bb59CEAF3f5120Da26B29e", qty: 1}, 
        {addr: "0xfcb9D0A9135487596A9A5C44AB769fcFb8cFA03e", qty: 1}, 
        {addr: "0xE9dD80F35885E72C853a9B62b65ef3a9c97144Fd", qty: 1}, 
        {addr: "0x1B795942a5758B4e9Ed6858B2B7C4E9fB007258e", qty: 1}, 
        {addr: "0x7669E7cfC057Cae8B01eeBa74a91D71D0ae2f264", qty: 20}, 
        {addr: "0xa58D762cDa3a4Bf4a081b5f57FF1Ac73337CCFAE", qty: 5},
        {addr: "0x75f15be75a35cfD4f12Bf56c71963BbE464Ddf4E", qty: 1},
        {addr: "0xbd7C0b157C0Db088B572259EafBD29af0eB05125", qty: 0},
        {addr: "0x66099E92c028271B02805376EdD8fd9d320FbBFb", qty: 0},
        {addr: "0xFA4bfE43030BA9933F6dbC68a42C388952810E23", qty: 0},
        {addr: "0x9b5F4A194a44D46189D56d3eCfA0071Cf6f3edB2", qty: 0},
        {addr: "0x47182D6a394396C6A84AA9bE4fa987721984838B", qty: 0},
        {addr: "0x32e28E36384beA019e9d09e72aB83E0bC7831bE0", qty: 0},
        {addr: "0x93f88B1B1711Ffb5584B121Fe01313dDf1155EC0", qty: 0},
        {addr: "0x8c94cd2232b94CF24baE6B27317d1dA2e9F21950", qty: 0},
        {addr: "0xF506A70B20E825EDA4A6b7fB02ff1d8a50726463", qty: 0},
        {addr: "0x2624fB9e4193eb2102274cb091bc76Cf1f3F6e8E", qty: 0}

    ]
    snapshot.map(l => whiteListSet.add(l.addr));
    return await whiteListSet.has(address);
}