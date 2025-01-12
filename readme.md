# Frog NFT Auction Project (GBM)

## Project Summary
This project is a platform running on the Sonic blockchain network ($S native token) where unique frog NFTs are sold through a GBM (Generalized Bid to Earn Mechanism) auction system. The platform allows users to bid on NFTs and earn rewards from the bidding process.

## Core Features

### NFT Collection
- Total of 10 unique frog NFTs
- Each NFT features original designs positioned in stream environments
- NFTs to be minted in ERC-721 standard

### GBM Auction Mechanism

#### Bidding Process
1. **Initial Bid**
   - User places first bid on an NFT
   - Bid amount is held in smart contract pool
   - Bid appears as current highest bid for the NFT

2. **Subsequent Bids**
   - New bid must be higher than current highest bid
   - Previous bidder receives two payments:
     * Full refund of their previous bid amount
     * 10% of the new bid amount as incentive payment

#### Example Scenario
1. Alice: Bids 100 $S
2. Bob: Bids 150 $S
   - Alice receives 100 $S refund
   - Alice also receives 15 $S (10% of 150) as incentive
3. Charlie: Bids 200 $S
   - Bob receives 150 $S refund
   - Bob also receives 20 $S (10% of 200) as incentive

## Technical Requirements

### Smart Contracts
- ERC-721 contract for NFT minting and management
- Custom contract for GBM auction mechanism
- Secure system for bid pool and payment management

### User Interface
- Gallery for NFT display
- List of active auctions
- Bidding and bid history
- User wallet integration

### Security
- Smart contract security audit
- Security checks in bidding and payment processes
- Emergency stop mechanism

## Roadmap
1. Smart Contract Development
2. Frontend Development
3. Testnet Deployment
4. Security Audit
5. Mainnet Deployment
6. NFT Collection Launch

## Economic Model
- Minimum bid increase: 10% (fixed)
- Incentive payment rate: 10% (fixed)

