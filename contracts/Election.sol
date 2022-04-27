//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Election { 

    //Model Candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }
    //Store Candidate
    //Fetch Candidate
    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public voters;
    //Store Candidate Count
    uint public candidatesCount;
    //Constructor
    constructor() {
       addCandidate("Candidate 1");
       addCandidate("Candidate 2");
       addCandidate("Candidate 3");

    }

     // voted event
    event votedEvent (
        uint indexed _candidateId
    );

    function addCandidate(string memory _name) private {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote(uint _candidateId) public {
        //require that they haven't voted before
        require(!voters[msg.sender]);
        //require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);
        //record that voter has voted. 
        voters[msg.sender] = true; 
        //update candidate vote count
        candidates[_candidateId].voteCount++;

        // trigger voted event
        emit votedEvent(_candidateId);
    }

}