import React from 'react';
import electionAbi from "./electionAbi.json";
import mintAbi from "./mintAbi.json";
import {ethers, BigNumber} from "ethers";
import {useEffect, useState} from "react";

const electionAddress = "0x4ED3027F937796F8000D7C358059b51aaE557AEb";
const mintExampleAddress = "0x22931E2D25725D3B984b1ca2F44697797f551D1E";

function Vote(){

var [voteId, setVoteId] = useState(0);
let mintContract;
let electionContract;

async function countVote(){
    if(window.ethereum){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      electionContract = new ethers.Contract(
        electionAddress, 
        electionAbi.abi, 
        signer
        );
      mintContract = new ethers.Contract(
          mintExampleAddress,
          mintAbi.abi,
          signer
        );

        try{
          const response1 = await mintContract.burn();
          const response = await electionContract.vote(voteId);
          console.log("response: ", mintContract);
          console.log("response: ", electionContract);
        } catch(err){
          console.log("error: ", err);
       }
    }
    
  }

  //Not completed. Working on displaying the results. 
  async function loadResults(){
    var candidatesResults;
      candidatesResults.empty();

    var candidatesSelect;
      candidatesSelect.empty();

    var size = electionContract.candidatesCount();
    for(var i =1; i < size; i++){
    let candidate = await electionContract.candidates(i);
    var id = candidate[0];
    var name = candidate[1];
    var voteCount = candidate[2];

    // Render candidate Result
    var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>"
    candidatesResults.append(candidateTemplate);

    // Render candidate ballot option
    var candidateOption = "<option value='" + id + "' >" + name + "</ option>"
    candidatesSelect.append(candidateOption);
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
         <button class = "submit" onClick={countVote}>Vote</button>
          </div>
          <div class = "results">
          </div>

      </div>
    </div>

    )
}
  export default Vote;