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