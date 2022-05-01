//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import "hardhat/console.sol";

contract Mint is Ownable, ERC721Enumerable{
    mapping(address=>uint256) public balances;
    uint256 public tokenId;

    constructor(
        string memory name,
        string memory symbol
    )ERC721(name,symbol){}

    function mint(uint256 numberOfMints) public payable{
        uint256 supply = totalSupply();
        for(uint256 i;  i< numberOfMints; i++){
            _safeMint(msg.sender, supply + i);
            balances[msg.sender]++;
        }
        console.log(balances[msg.sender]);
    }

    function TokenId() internal view returns (uint256){
       return tokenOfOwnerByIndex(msg.sender, 0);
    }

    function burn() public {
        tokenId = TokenId();
        console.log(tokenId);
        _burn(tokenId);
    }
}
