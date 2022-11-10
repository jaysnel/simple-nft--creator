import React from 'react'
import LoadingIcon from './LoadingIcon';
import Button from './Button';

export default function CheckForWallet(props) {
    const { isCheckingForWallet, walletConnected, buttonFunction, userMessage } = props;
    
    if(isCheckingForWallet) {
        return (
            <div className='m-auto max-w-md text-center mt-5'>
                <h3>Checking For Wallet</h3>
                <LoadingIcon classNames='m-auto mt-5' fill='rgb(34 211 238)'/>
            </div>
        )
    }

    if(!walletConnected) {
        return (
            <div className='m-auto mt-5 max-w-md flex flex-col justify-center'>
                <h3 className='mb-5'>Wallet not connected or you do not have a wallet installed.</h3>
                <h3 className='mb-5'>If you do not have one installed, we recommend MetaMask.</h3>
                <p className='mb-5 text-red-error'>Error: {userMessage}</p>
                <Button buttonText='Connect Wallet' buttonClassNames='bg-purple-100 hover:bg-purple-200 px-5 py-2' buttonFunction={buttonFunction}/>
            </div>
        )
    }

    return (
        <>
        </>
    )
}
