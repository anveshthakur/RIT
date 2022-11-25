import { ethers } from 'ethers';
import abi from '../Blockchain/abi.json'

export async function tokensOfOwner(address){
    const contract_addr = process.env.REACT_APP_CONTRACT_ADDRESS;
    const contract = new ethers.Contract(
        contract_addr,
        abi,
        new ethers.providers.Web3Provider(window.ethereum)
    )
    console.log(address);
    let ts = (await contract.totalSupply()).toNumber();
    for (let i = 0; i < ts; i++) {
        let tokenOwner = await contract.ownerOf(i);
        if(tokenOwner === address){
            console.log(i);
            return i;
        }
    }
}

export async function contract_balanceOf(address){
    const contract_addr = process.env.REACT_APP_CONTRACT_ADDRESS;
    const contract = new ethers.Contract(
        contract_addr,
        abi,
        new ethers.providers.Web3Provider(window.ethereum)
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
        // {addr: "0x044B49d6b24f6f090f46a1e2f5d8B30C71807fc6", qty: 1} 
    ]

    snapshot.map(l => whiteListSet.add(l.addr));
    console.log(whiteListSet.has(address));
    return await whiteListSet.has(address);
}