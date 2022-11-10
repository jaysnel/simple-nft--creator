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
    const [errorMessage, setErrorMessage] = useState('');
    const [nftCreated, setNftCreated] = useState(false);
    const nftCollectionLink = 'https://testnets.opensea.io/collection/simplenftcreator';
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
            await nftContractAddress.makeSimpleNFT(formattedNftTotal, userNFT);
            console.log('NFT Minted.')

            setIsCreatingNFT(false);
            setNftCreated(true);
            setUserNFTName('');
            setUserNFTDescription('');
            setUserNFTImageUrl('');
        } catch(err) {
            console.log(err);
            setErrorMessage(err.message);
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
            <input type="" className='border border-black mb-5 p-2' placeholder='NFT Name' value={userNFTName} onChange={updateUserNFTName}/>
            <input type="" className='border border-black mb-5 p-2' placeholder='NFT Description' value={userNFTNDescription} onChange={updateUserNFTNDescription}/>
            <input type="" className='border border-black p-2' placeholder='NFT Image Url' value={userNFTImageUrl} onChange={updateUserNFTNImageUrl}/>
        </div>
        {nftCreated && <div className='mb-5'><a href={nftCollectionLink} target="_blank" rel="noreferrer">View NFT</a></div>}
        {nftCreated && <div className='mb-5'>Note: If you do not see your NFT, please give it a couple min to show.</div>}
        {errorMessage && <div className='text-red-error'>Error: {errorMessage}</div>}
        {
            isCreatingNFT 
            ? <LoadingIcon classNames='m-auto' fill='rgb(34 211 238)'/>
            : 
            <Button 
                buttonClassNames='bg-purple-100 hover:bg-purple-200 px-5 py-2' 
                buttonText='Create NFT' 
                buttonFunction={createNFT}/>
        }
        <div className='mt-5'>
            Created by Jaylan Snelson. <a href="https://github.com/jaysnel/simple-nft-creator-ui" target="_blank" rel="noopener noreferrer">Github</a>
        </div>
    </>
  )
}
