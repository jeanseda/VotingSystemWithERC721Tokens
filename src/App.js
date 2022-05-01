
import './App.css';
import mintAbi from "./mintAbi.json";
import {ethers, BigNumber} from "ethers";
import {useEffect, useState} from "react";
import { render } from '@testing-library/react';

const mintExampleAddress = "0x22931E2D25725D3B984b1ca2F44697797f551D1E";

function App() {
  //Connecting
  const isBackgroundRed = true;
  const [accounts, setAccounts ] = useState([]); //save data that may change

  async function connectAccounts(){
    if(window.ethereum){
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      });
      setAccounts(accounts);
    }
  }

  useEffect(()=> {
    connectAccounts();
  }, []);

  //Minting functionality
  const [mintAmount, setMintAmount] = useState(1);

  async function handleMint(){
    if(window.ethereum){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        mintExampleAddress,
        mintAbi.abi,
        signer
      );
      try{
        const response = await contract.mint(BigNumber.from(mintAmount));
        console.log("response: ", response);
      } catch(err){
        console.log("error: ", err);
      }
    }
  }

  //This function will be used to withdraw mint everytime there is a vote. 
  async function withdrawalMint(){
    if(window.ethereum){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        mintExampleAddress,
        mintAbi.abi,
        signer
      );
      try{
        const response = await contract.withdrawal(BigNumber.from(mintAmount));
        console.log("response: ", response);
      } catch(err){
        console.log("error: ", err);
      }
    }
  }

  return (
    <div className= "App">
      This is how you create a mint button
      {accounts.length && (
        <div>
          <h1>Account: {accounts[0]}</h1>
          <button class ="button button1" onClick={()=> setMintAmount( mintAmount -1)}>-</button>
            {mintAmount}
          <button class ="button button2" onClick={()=> setMintAmount(mintAmount+1)}>+</button>
          <button class ="button button3" onClick={handleMint}>Mint</button>

        </div>
        
      )}
    </div>
  );

}
export default App;
