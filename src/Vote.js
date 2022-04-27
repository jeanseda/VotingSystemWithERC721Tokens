import React from 'react';
import electionAbi from "./electionAbi.json";
import {ethers, BigNumber} from "ethers";
import {useEffect, useState} from "react";

const electionAddress = "0xB312D1fA9b9180C36CF988e855bbB73660F58C89";

function Vote(){

var [voteId, setVoteId] = useState(0);

async function vote(){
    if(window.ethereum){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(electionAddress, 
        electionAbi.abi, 
        signer
        );
        try{
          const response = await contract.vote(voteId);
          console.log("response: ", response);
        } catch(err){
          console.log("error: ", err);
       }
    }
  }
  
  return(
    <div className = 'vote'>
        <h1>Election Results</h1>
      <div class = "container">
          <div class = "row">
         <button class = "button button1" onClick={()=>setVoteId(voteId = 1)}> Candidate 1</button>   
         <button class = "button button1" onClick={()=>setVoteId(voteId = 2)}> Candidate 2</button>   
         <button class = "button button1" onClick={()=>setVoteId(voteId = 3)}> Candidate 3</button> 
          </div>
          <div> 
         <button class = "submit" onClick={vote}>Vote</button>
          </div>
          </div>
    </div>

    )
}

  

  export default Vote;