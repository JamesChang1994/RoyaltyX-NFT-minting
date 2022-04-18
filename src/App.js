import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
// Redux
import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import './App.scss';

import { createAlchemyWeb3 } from "@alch/alchemy-web3";

import TokenArtifact from "./contracts/NFT.json";
import contractAddress from "./contracts/contract-address.json";

const Allowed_NETWORK_ID = "4";
const AlchemyWeb3URL = "https://eth-rinkeby.alchemyapi.io/v2/gdOvJjVNmQ6fAqIZ46sy7uTYW-Is7-Kl";

let web3;
let contract;

const App = () => {
  const [address, setAddress] = useState();

  useEffect(() => {
    getWeb3();
  })

  const getWeb3 = async () => {
    web3 = createAlchemyWeb3(AlchemyWeb3URL);
    console.log('get web3', web3);
    contract = new web3.eth.Contract(
      TokenArtifact.abi,
      contractAddress.Token
    );
    console.log('get contract', contract);
  }
  
  const connectWallet = async () => {
    const [userAddress] = await window.ethereum.enable();
    setAddress(userAddress);
  }
  
  return (
    <Provider store={store}>
      <Router>
        <Navbar connectWallet={connectWallet} address={address} />
        <Routes>
          <Route path="/" element={<Home address={address} web3={web3} contract={contract} />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
