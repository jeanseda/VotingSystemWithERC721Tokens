const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("Election", function () {
  let electionInstance;
  let Election;

  beforeEach(async function(){
  Election = await ethers.getContractFactory("Election");
  const [owner] = await ethers.getSigners();

  electionInstance = await Election.deploy();

  })

  it("initializes with three candidates", async function () {
    const candidatesCount = await electionInstance.candidatesCount();
    expect(await electionInstance.candidatesCount()).to.equal("3");
  });

  it("initializes the candidates with the correct values", async function() {
   let candidate = await electionInstance.candidates(1);

   assert.equal(candidate[0],1,"the id matches the candidate");
   assert.equal(candidate[1], "Candidate 1", "The candidate name matches");
   assert.equal(candidate[2], 0, "the votes matches");

   candidate = await electionInstance.candidates(2);
   assert.equal(candidate[0],2, "The id matches the candidate");
   assert.equal(candidate[1],"Candidate 2", "The candidate name matches")
   assert.equal(candidate[2],0, "The votes matches");

   candidate = await electionInstance.candidates(3);
   assert.equal(candidate[0],3, "The id matches the candidate");
   assert.equal(candidate[1],"Candidate 3", "The candidate name matches")
   assert.equal(candidate[2],0, "The votes matches");
  });

});
