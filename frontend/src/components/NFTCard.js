import React from 'react';
import { Box, Text, VStack, Badge, Button, useToast, useColorModeValue, HStack } from '@chakra-ui/react';
import AuctionInterface from './AuctionInterface';
import { useWeb3 } from '../context/Web3Context';

export default function NFTCard({ nft, onUpdate }) {
    const { account, nftContract, auctionContract } = useWeb3();
    const isOwner = account && nft.owner.toLowerCase() === account.toLowerCase();
    const isContractOwner = nft.owner.toLowerCase() === auctionContract?.target?.toLowerCase();
    const toast = useToast();
    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');

    const decodeTokenURI = (uri) => {
        try {
            const base64Json = uri.replace('data:application/json;base64,', '');
            const jsonString = atob(base64Json);
            const metadata = JSON.parse(jsonString);
            const svgBase64 = metadata.image.replace('data:image/svg+xml;base64,', '');
            return atob(svgBase64);
        } catch (error) {
            console.error('Error decoding token URI:', error);
            return null;
        }
    };

    const startAuction = async () => {
        try {
            const approveTx = await nftContract.approve(auctionContract.target, nft.id);
            await approveTx.wait();

            const tx = await auctionContract.createAuction(nft.id);
            await tx.wait();

            toast({
                title: "Auction Started!",
                description: `Auction for NFT #${nft.id} has been started successfully.`,
                status: "success",
                duration: 5000,
                isClosable: true,
            });

            if (onUpdate) onUpdate();
        } catch (error) {
            console.error('Auction start error:', error);
            
            let errorMessage = "Failed to start auction. Please try again.";
            
            if (error.code === 4001 || error.message?.includes('user rejected')) {
                errorMessage = "You declined the transaction in your wallet.";
            } else if (error.message?.includes('not owner')) {
                errorMessage = "You are not the owner of this NFT.";
            } else if (error.message?.includes('already exists')) {
                errorMessage = "An auction already exists for this NFT.";
            } else if (error.message?.includes('not approved')) {
                errorMessage = "NFT approval failed. Please try again.";
            } else if (error.message?.includes('gas')) {
                errorMessage = "There was an issue with the gas fee. Please try again.";
            }

            toast({
                title: "Failed to Start Auction",
                description: errorMessage,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={8}
            bg={cardBg}
            borderColor={borderColor}
            boxShadow="xl"
            transition="all 0.3s"
            _hover={{ transform: 'translateY(-2px)', boxShadow: '2xl' }}
            minW="300px"
        >
            <VStack spacing={6}>
                <Box 
                    w="300px" 
                    h="300px" 
                    borderRadius="lg"
                    overflow="hidden"
                    dangerouslySetInnerHTML={{
                        __html: decodeTokenURI(nft.uri) || `<svg width="300" height="300">
                            <rect width="100%" height="100%" fill="#f0f0f0"/>
                            <text x="50%" y="50%" font-size="16" fill="#666" text-anchor="middle">
                                Onchain Frogs #${nft.id}
                            </text>
                        </svg>`
                    }}
                />
                
                <Text fontSize="24px" fontWeight="bold" letterSpacing="wide">
                    Onchain Frogs #{nft.id}
                </Text>

                {isOwner && (
                    <Badge 
                        colorScheme="green" 
                        fontSize="16px"
                        px={4} 
                        py={2}
                        borderRadius="full"
                    >
                        Your NFT
                    </Badge>
                )}

                <HStack spacing={2} align="center">
                    <Text fontSize="16px" color="gray.500" letterSpacing="wide">
                        Owner: {nft.owner.slice(0, 6)}...{nft.owner.slice(-4)}
                    </Text>
                    {isContractOwner && (
                        <Badge 
                            colorScheme="purple" 
                            fontSize="14px"
                            px={2} 
                            py={1}
                            borderRadius="full"
                        >
                            Contract
                        </Badge>
                    )}
                </HStack>

                <Box w="100%" mt={4}>
                    {nft.auction.isActive ? (
                        <>
                            <VStack spacing={2} align="stretch" mb={4}>
                                <HStack justify="space-between">
                                    <Text fontSize="sm" color="gray.500">
                                        Highest Bidder:
                                    </Text>
                                    <Text fontSize="sm" fontWeight="medium">
                                        {nft.auction.currentBidder.slice(0, 6)}...{nft.auction.currentBidder.slice(-4)}
                                    </Text>
                                </HStack>
                                
                                {nft.auction.previousBid !== "0.0" && (
                                    <HStack justify="space-between">
                                        <Text fontSize="sm" color="gray.500">
                                            Previous Bid:
                                        </Text>
                                        <Text fontSize="sm" fontWeight="medium">
                                            {nft.auction.previousBid} S
                                        </Text>
                                    </HStack>
                                )}
                            </VStack>
                            
                            <AuctionInterface
                                tokenId={nft.id}
                                currentBid={nft.auction.currentBid}
                                isActive={nft.auction.isActive}
                                currentBidder={nft.auction.currentBidder}
                                onUpdate={onUpdate}
                            />
                        </>
                    ) : isOwner ? (
                        <Button
                            colorScheme="blue"
                            onClick={startAuction}
                            w="100%"
                            size="lg"
                            h="56px"
                            fontSize="18px"
                            borderRadius="lg"
                            fontWeight="semibold"
                        >
                            Start Auction
                        </Button>
                    ) : (
                        <Text 
                            color="gray.500" 
                            textAlign="center"
                            fontSize="16px"
                        >
                            No active auction for this NFT
                        </Text>
                    )}
                </Box>
            </VStack>
        </Box>
    );
} 