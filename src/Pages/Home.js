import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import abi from '../utils/nftContract.json'
import Button from '../components/Button';
import LoadingIcon from '../components/LoadingIcon';

export default function Home(props) {
    const { currentSigner } = props;
    const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
    const [userNFTName, setUserNFTName] = useState('');
    const [userNFTNDescription, setUserNFTDescription] = useState('');
    const [userNFTImageUrl, setUserNFTImageUrl] = useState('');
    const [numberOfNftsOnContract, setNumberOfNftsOnContract] = useState(0);
    const [isCreatingNFT, setIsCreatingNFT] = useState(false);
    const userNFT = `{ "name": "${userNFTName}", "description": "${userNFTNDescription}", "image": "${userNFTImageUrl}" }`

    const createNFT = async () => {
        try {
            setIsCreatingNFT(true);
            const { ethereum } = window;
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const contractABI = abi.abi;
            const nftContractAddress = new ethers.Contract(contractAddress, contractABI, signer);
            console.log('Contract Address: ', nftContractAddress);
            
            // MINT NFT
            const currentNftTotal = await nftContractAddress.getNFTCount();
            const formattedNftTotal = currentNftTotal.toNumber();
            console.log('Current NFT Total: ', formattedNftTotal);
            await nftContractAddress.makeJSNFT(formattedNftTotal, userNFT);
            console.log('NFT Minted.')

            setIsCreatingNFT(false);
        } catch(err) {
            console.log(err);
            setIsCreatingNFT(false);
        }
    }

    const getTotalNftsOnContract = async () => {
        try {
            const { ethereum } = window;
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const contractABI = abi.abi;
            const nftContractAddress = new ethers.Contract(contractAddress, contractABI, signer);
            const currentNftTotal = await nftContractAddress.getNFTCount();
            const formattedNftTotal = currentNftTotal.toNumber();
            setNumberOfNftsOnContract(formattedNftTotal);
        } catch (err) {
            console.log(err);
        }
    }

    const updateUserNFTName = (e) => {
        setUserNFTName(e.target.value);
    }

    const updateUserNFTNDescription = (e) => {
        setUserNFTDescription(e.target.value);
    }

    const updateUserNFTNImageUrl = (e) => {
        setUserNFTImageUrl(e.target.value);
    }

    useEffect(() => {
        getTotalNftsOnContract();
    })

  return (
    <>
        <h1>Simple NFT Creator</h1>
        <div className='my-5'>
            <div>
                Current NFT's on this contract: {numberOfNftsOnContract}
            </div>
            <div>
                Contract Address: {contractAddress}
            </div>
            <div>
                Current Signer: {currentSigner}
            </div>
        </div>
        <div className='m-auto mb-5 flex flex-col justify-center max-w-sm'>
            <input type="" className='border border-black mb-5 p-2' placeholder='NFT Name' onChange={updateUserNFTName}/>
            <input type="" className='border border-black mb-5 p-2' placeholder='NFT Description' onChange={updateUserNFTNDescription}/>
            <input type="" className='border border-black p-2' placeholder='NFT Image Url' onChange={updateUserNFTNImageUrl}/>
        </div>
        {
            isCreatingNFT 
            ? <LoadingIcon classNames='m-auto' fill='rgb(34 211 238)'/>
            : 
            <Button 
                buttonClassNames='bg-purple-100 px-5 py-2' 
                buttonText='Create NFT' 
                buttonFunction={createNFT}/>
        }
        <div className='mt-5'>
            Created by Jaylan Snelson. <a href="https://github.com/jaysnel/js-nft-web3-ui" target="_blank" rel="noopener noreferrer">Github</a>
        </div>
    </>
  )
}
