import React, { useState } from 'react';
import { Button, Input, Text, VStack, useColorModeValue, useToast } from '@chakra-ui/react';
import { useWeb3 } from '../context/Web3Context';
// eslint-disable-next-line no-unused-vars
import { parseEther, formatEther } from 'ethers';

export default function AuctionInterface({ tokenId, currentBid, isActive, currentBidder, onUpdate }) {
    const { account, auctionContract } = useWeb3();
    const [bidAmount, setBidAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    
    const buttonBg = useColorModeValue('blue.500', 'blue.400');
    const buttonHoverBg = useColorModeValue('blue.600', 'blue.500');
    const isWinner = !isActive && account?.toLowerCase() === currentBidder?.toLowerCase();

    const minBidAmount = Number(currentBid) + (Number(currentBid) * 0.1);

    const placeBid = async () => {
        if (!account) {
            toast({
                title: "Error",
                description: "Please connect your wallet first",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        if (!bidAmount) {
            toast({
                title: "Error",
                description: "Please enter a bid amount",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try {
            setIsLoading(true);
            const bidWei = parseEther(bidAmount);
            
            const signer = await auctionContract.runner.provider.getSigner(account);
            const connectedContract = auctionContract.connect(signer);
            
            const tx = await connectedContract.placeBid(tokenId, {
                value: bidWei,
                from: account
            });
            
            await tx.wait();
            
            toast({
                title: "Success",
                description: "Bid placed successfully!",
                status: "success",
                duration: 5000,
                isClosable: true,
            });

            setBidAmount('');
            if (onUpdate) onUpdate();
            
        } catch (error) {
            console.error('Bid error:', error);
            
            let errorMessage = "Failed to place bid. Please try again.";
            
            if (error.code === 4001 || error.message?.includes('user rejected')) {
                errorMessage = "You declined the transaction in your wallet.";
            } else if (error.message?.includes('insufficient funds')) {
                errorMessage = "You don't have enough funds to place this bid.";
            } else if (error.message?.includes('gas')) {
                errorMessage = "There was an issue with the gas fee. Please try again.";
            }

            toast({
                title: "Bid Failed",
                description: errorMessage,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const claimNFT = async () => {
        if (!account) return;
        
        try {
            setIsLoading(true);
            const tx = await auctionContract.claimNFT(tokenId);
            await tx.wait();
            
            toast({
                title: "Success!",
                description: `NFT #${tokenId} has been claimed successfully!`,
                status: "success",
                duration: 5000,
                isClosable: true,
            });

            if (onUpdate) onUpdate();
        } catch (error) {
            console.error('Claim error:', error);
            
            let errorMessage = "Failed to claim NFT. Please try again.";
            
            if (error.code === 4001 || error.message?.includes('user rejected')) {
                errorMessage = "You declined the transaction in your wallet.";
            } else if (error.message?.includes('not winner')) {
                errorMessage = "You are not the winner of this auction.";
            } else if (error.message?.includes('auction active')) {
                errorMessage = "The auction is still active.";
            }

            toast({
                title: "Claim Failed",
                description: errorMessage,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Eğer açık artırma bitmişse ve kazanan kişiysek
    if (!isActive && isWinner) {
        return (
            <VStack spacing={4} align="stretch" p={6} borderRadius="lg" boxShadow="sm">
                <Text 
                    fontSize="20px" 
                    fontWeight="bold"
                    color="green.500"
                >
                    🎉 Congratulations! You won this auction!
                </Text>
                <Text fontSize="md">
                    Winning Bid: {currentBid} S
                </Text>
                <Button
                    onClick={claimNFT}
                    isLoading={isLoading}
                    bg="green.500"
                    color="white"
                    size="lg"
                    height="56px"
                    fontSize="18px"
                    fontWeight="semibold"
                    _hover={{ bg: "green.600" }}
                    _active={{ bg: "green.700" }}
                >
                    Claim NFT
                </Button>
            </VStack>
        );
    }

    // Eğer açık artırma bitmişse ama kazanan kişi değilsek
    if (!isActive) {
        return (
            <VStack spacing={4} align="stretch" p={6} borderRadius="lg" boxShadow="sm">
                <Text fontSize="md">
                    Auction Ended
                </Text>
                <Text fontSize="md">
                    Winning Bid: {currentBid} S
                </Text>
            </VStack>
        );
    }

    // Normal açık artırma arayüzü
    return (
        <VStack spacing={6} align="stretch" p={6} borderRadius="lg" boxShadow="sm">
            <VStack align="stretch" spacing={2}>
                <Text 
                    fontSize="20px" 
                    fontWeight="medium"
                    letterSpacing="wide"
                >
                    Current Bid: {currentBid} S
                </Text>
                <Text 
                    fontSize="14px" 
                    color="gray.500"
                >
                    Minimum bid: {minBidAmount.toFixed(2)} S (10% increase required)
                </Text>
            </VStack>
            
            <Input
                type="number"
                placeholder={`Minimum bid: ${minBidAmount.toFixed(2)} S`}
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                size="lg"
                height="56px"
                fontSize="18px"
                borderRadius="lg"
                borderWidth="2px"
                min={minBidAmount}
                _focus={{
                    borderColor: "blue.500",
                    boxShadow: "0 0 0 1px blue.500"
                }}
            />

            {Number(bidAmount) < minBidAmount && bidAmount && (
                <Text color="red.500" fontSize="sm">
                    Bid must be at least {minBidAmount.toFixed(2)} S
                </Text>
            )}

            <Button
                onClick={placeBid}
                isLoading={isLoading}
                bg={buttonBg}
                color="white"
                size="lg"
                height="56px"
                fontSize="18px"
                fontWeight="semibold"
                _hover={{
                    bg: buttonHoverBg
                }}
                _active={{
                    bg: buttonHoverBg
                }}
                disabled={!bidAmount || isLoading || Number(bidAmount) < minBidAmount}
            >
                Place Bid
            </Button>
        </VStack>
    );
} 