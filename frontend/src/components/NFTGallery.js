import React, { useState, useEffect, useCallback } from 'react';
import { SimpleGrid, VStack, Text, Center, Spinner, Box, HStack, useColorModeValue, Progress } from '@chakra-ui/react';
import { useWeb3 } from '../context/Web3Context';
import NFTCard from './NFTCard';
import AdminPanel from './AdminPanel';
import { formatEther } from 'ethers';

/* global BigInt */

export default function NFTGallery() {
    const { account, nftContract, auctionContract } = useWeb3();
    const [nfts, setNfts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [userStats, setUserStats] = useState({
        winningAuctions: 0,
        totalActiveBids: '0'
    });
    const [isOwner, setIsOwner] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);

    const statsBg = useColorModeValue('blue.50', 'blue.900');
    const statsTextColor = useColorModeValue('blue.600', 'blue.200');

    const fetchNFTs = useCallback(async () => {
        if (!nftContract || !auctionContract || !account) {
            console.log("Contracts or account not ready");
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            setLoadingProgress(90);
            
            const maxSupply = await nftContract.MAX_SUPPLY();
            console.log('Maximum NFT supply:', maxSupply.toString());
            setLoadingProgress(92);
            
            const nftData = [];
            let winningCount = 0;
            let totalBidsWei = 0n;

            const maxSupplyNumber = Number(maxSupply);

            for (let i = 1; i <= maxSupplyNumber; i++) {
                try {
                    const owner = await nftContract.ownerOf(i);
                    const auction = await auctionContract.auctions(i);
                    const tokenURI = await nftContract.tokenURI(i);

                    if (auction.isActive && auction.currentBidder.toLowerCase() === account.toLowerCase()) {
                        winningCount++;
                        totalBidsWei += BigInt(auction.currentBid.toString());
                    }

                    nftData.push({
                        id: i,
                        owner: owner,
                        uri: tokenURI,
                        auction: {
                            isActive: auction.isActive,
                            currentBid: formatEther(auction.currentBid),
                            currentBidder: auction.currentBidder,
                            previousBid: formatEther(auction.previousBid || '0'),
                        }
                    });

                    const progress = 92 + Math.floor((i / maxSupplyNumber) * 5);
                    setLoadingProgress(progress);
                } catch (error) {
                    if (!error.message.includes("nonexistent token")) {
                        console.error(`Error fetching NFT #${i}:`, error);
                    }
                }
            }

            setLoadingProgress(97);
            setUserStats({
                winningAuctions: winningCount,
                totalActiveBids: formatEther(totalBidsWei.toString())
            });
            setNfts(nftData);
            setLoadingProgress(100);
        } catch (error) {
            console.error('Error fetching NFTs:', error);
        } finally {
            setIsLoading(false);
        }
    }, [nftContract, auctionContract, account]);

    useEffect(() => {
        fetchNFTs();
    }, [fetchNFTs]);

    useEffect(() => {
        const checkOwner = async () => {
            if (auctionContract && account) {
                try {
                    const owner = await auctionContract.owner();
                    setIsOwner(owner.toLowerCase() === account.toLowerCase());
                } catch (error) {
                    console.error('Error checking owner:', error);
                }
            }
        };
        
        checkOwner();
    }, [auctionContract, account]);

    if (isLoading) {
        return (
            <Center p={8} flexDirection="column" maxW="400px" mx="auto">
                <Spinner size="xl" mb={4} />
                <Text fontSize="lg" fontWeight="medium" color="blue.500" mb={4} textAlign="center">
                    Fetching data from smart contracts...
                </Text>
                <Progress 
                    value={loadingProgress} 
                    size="sm" 
                    width="100%" 
                    colorScheme="blue" 
                    borderRadius="full"
                    hasStripe
                    isAnimated
                />
                <Text fontSize="sm" color="gray.500" mt={2}>
                    Loading... {loadingProgress}%
                </Text>
            </Center>
        );
    }

    return (
        <VStack spacing={8} w="100%">
            {isOwner && <AdminPanel />}
            
            <Box
                p={6}
                bg={statsBg}
                borderRadius="xl"
                w="100%"
                maxW="800px"
            >
                <HStack spacing={8} justify="center">
                    <VStack align="center">
                        <Text fontSize="lg" fontWeight="bold" color={statsTextColor}>
                            Your Winning Auctions
                        </Text>
                        <Text fontSize="2xl" fontWeight="bold">
                            {userStats.winningAuctions}
                        </Text>
                    </VStack>
                    <VStack align="center">
                        <Text fontSize="lg" fontWeight="bold" color={statsTextColor}>
                            Your Total Active Bids
                        </Text>
                        <Text fontSize="2xl" fontWeight="bold">
                            {userStats.totalActiveBids} S
                        </Text>
                    </VStack>
                </HStack>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="100%">
                {nfts.map(nft => (
                    <NFTCard key={nft.id} nft={nft} onUpdate={fetchNFTs} />
                ))}
            </SimpleGrid>
        </VStack>
    );
} 