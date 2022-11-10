import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CheckForWallet from './components/CheckForWallet';
import NavBar from './components/NavBar';
import Home from './Pages/Home';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [isCheckingForWallet, setIsCheckingForWallet] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentSigner, setCurrentSigner] = useState('');
  const signIntoWallet = async () => {
    try {
      const { ethereum } = window;
      const signer = await ethereum.request({method: 'eth_requestAccounts'});
      await signer;
      if(signer) {
        setWalletConnected(true);
        setIsSignedIn(true);
        setCurrentSigner(signer[0]);
        }
      } catch (err) { 
        setIsSignedIn(false);
        setErrorMessage(err.message);
        setIsCheckingForWallet(false);
        console.log(err);
      }
  }

  useEffect(() => {
    signIntoWallet();
  }, []);

  if(!isSignedIn) {
    return (
      <CheckForWallet 
        isCheckingForWallet={isCheckingForWallet} 
        walletConnected={walletConnected}
        userMessage={errorMessage}
        buttonFunction={signIntoWallet}/>
    )
  }

  return (
    <div className="App">
    <BrowserRouter>
      <NavBar />
      <h1  className='mt-5'>Simple NFT Creator</h1>
      <Routes>
        <Route path='/' element={<Home currentSigner={currentSigner}/>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
