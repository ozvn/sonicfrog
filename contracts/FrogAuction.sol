// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FrogAuction is ReentrancyGuard, Ownable {
    IERC721 public immutable nftContract;
    
    struct Auction {
        uint256 tokenId;
        address currentBidder;
        uint256 currentBid;
        uint256 previousBid;
        bool isActive;
        bool isEnded;
        bool isClaimed;
    }
    
    mapping(uint256 => Auction) public auctions;
    
    uint256 public constant INCENTIVE_PERCENTAGE = 10;
    uint256 public constant MIN_BID_INCREASE = 10;

    event NewBid(uint256 indexed tokenId, address bidder, uint256 amount);
    event AuctionCreated(uint256 indexed tokenId);
    event AuctionEnded(uint256 indexed tokenId, address winner, uint256 amount);
    event WithdrawBalance(address owner, uint256 amount);
    event NFTClaimed(uint256 indexed tokenId, address winner);
    event AuctionEndedByOwner(uint256 indexed tokenId);

    constructor(address _nftContract) Ownable(msg.sender) {
        require(_nftContract != address(0), "Invalid NFT contract address");
        nftContract = IERC721(_nftContract);
    }

    function createAuction(uint256 tokenId) external {
        require(nftContract.ownerOf(tokenId) == msg.sender, "Not token owner");
        require(!auctions[tokenId].isActive, "Auction already exists");
        
        nftContract.transferFrom(msg.sender, address(this), tokenId);
        
        auctions[tokenId] = Auction({
            tokenId: tokenId,
            currentBidder: address(0),
            currentBid: 0,
            previousBid: 0,
            isActive: true,
            isEnded: false,
            isClaimed: false
        });
        
        emit AuctionCreated(tokenId);
    }

    function placeBid(uint256 tokenId) external payable nonReentrant {
        Auction storage auction = auctions[tokenId];
        require(auction.isActive, "Auction not active");
        require(!auction.isEnded, "Auction already ended");
        require(msg.value > auction.currentBid, "Bid too low");
        
        uint256 minBidIncrease = (auction.currentBid * MIN_BID_INCREASE) / 100;
        require(msg.value >= auction.currentBid + minBidIncrease, "Bid increase too low");
        
        if (auction.currentBidder != address(0)) {
            auction.previousBid = auction.currentBid;
            uint256 incentive = (msg.value * INCENTIVE_PERCENTAGE) / 100;
            (bool success, ) = payable(auction.currentBidder).call{value: auction.currentBid + incentive}("");
            require(success, "Refund failed");
        }
        
        auction.currentBidder = msg.sender;
        auction.currentBid = msg.value;
        
        emit NewBid(tokenId, msg.sender, msg.value);
    }

    function endAuctionByOwner(uint256 tokenId) external onlyOwner {
        Auction storage auction = auctions[tokenId];
        require(auction.isActive, "Auction not active");
        require(!auction.isEnded, "Auction already ended");
        require(auction.currentBidder != address(0), "No bids placed");
        
        auction.isEnded = true;
        auction.isActive = false;
        
        emit AuctionEndedByOwner(tokenId);
    }

    function claimNFT(uint256 tokenId) external nonReentrant {
        Auction storage auction = auctions[tokenId];
        require(!auction.isActive && auction.isEnded, "Auction not ended");
        require(auction.currentBidder == msg.sender, "Not auction winner");
        require(!auction.isClaimed, "NFT already claimed");
        
        auction.isClaimed = true;
        nftContract.transferFrom(address(this), auction.currentBidder, tokenId);
        
        emit NFTClaimed(tokenId, msg.sender);
    }

    function withdrawBalance() external onlyOwner nonReentrant {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");
        
        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Withdrawal failed");
        
        emit WithdrawBalance(owner(), balance);
    }

    receive() external payable {}
    fallback() external payable {}
} 