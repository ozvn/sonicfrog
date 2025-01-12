import React, { useState, useEffect, useCallback } from 'react';
import {
    Box,
    VStack,
    Text,
    Button,
    useToast,
    useColorModeValue,
    Input,
    Divider,
    HStack
} from '@chakra-ui/react';
import { useWeb3 } from '../context/Web3Context';
import { formatEther } from 'ethers';

export default function AdminPanel() {
    const { auctionContract } = useWeb3();
    const [balance, setBalance] = useState('0');
    const [isLoading, setIsLoading] = useState(false);
    const [tokenIdToEnd, setTokenIdToEnd] = useState('');
    const toast = useToast();

    const bgColor = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');

    const fetchBalance = useCallback(async () => {
        if (!auctionContract) return;
        
        try {
            const balance = await auctionContract.runner.provider.getBalance(auctionContract.target);
            setBalance(formatEther(balance));
        } catch (error) {
            console.error('Error fetching balance:', error);
        }
    }, [auctionContract]);

    const withdrawBalance = async () => {
        try {
            setIsLoading(true);
            const tx = await auctionContract.withdrawBalance();
            await tx.wait();
            
            toast({
                title: "Success",
                description: "Balance withdrawn successfully!",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            
            await fetchBalance();
        } catch (error) {
            console.error('Withdraw error:', error);
            toast({
                title: "Error",
                description: "Failed to withdraw balance",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const endAuction = async () => {
        if (!tokenIdToEnd) {
            toast({
                title: "Error",
                description: "Please enter a token ID",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try {
            setIsLoading(true);
            const tx = await auctionContract.endAuctionByOwner(tokenIdToEnd);
            await tx.wait();
            
            toast({
                title: "Success",
                description: `Auction for NFT #${tokenIdToEnd} ended successfully!`,
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            
            setTokenIdToEnd('');
        } catch (error) {
            console.error('End auction error:', error);
            toast({
                title: "Error",
                description: "Failed to end auction",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBalance();
    }, [fetchBalance]);

    return (
        <Box
            p={6}
            bg={bgColor}
            borderRadius="xl"
            borderWidth="1px"
            borderColor={borderColor}
            w="100%"
            maxW="600px"
            mx="auto"
            mb={8}
        >
            <VStack spacing={6} align="stretch">
                <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                    Admin Panel
                </Text>

                <VStack spacing={4} align="stretch">
                    <Text fontSize="lg" fontWeight="medium">
                        Contract Balance: {balance} S
                    </Text>
                    <Button
                        colorScheme="green"
                        onClick={withdrawBalance}
                        isLoading={isLoading}
                        loadingText="Withdrawing..."
                    >
                        Withdraw Balance
                    </Button>
                </VStack>

                <Divider />

                <VStack spacing={4} align="stretch">
                    <Text fontSize="lg" fontWeight="medium">
                        End Auction
                    </Text>
                    <HStack>
                        <Input
                            placeholder="Enter Token ID"
                            value={tokenIdToEnd}
                            onChange={(e) => setTokenIdToEnd(e.target.value)}
                            type="number"
                        />
                        <Button
                            colorScheme="red"
                            onClick={endAuction}
                            isLoading={isLoading}
                            loadingText="Ending..."
                            minW="150px"
                        >
                            End Auction
                        </Button>
                    </HStack>
                </VStack>
            </VStack>
        </Box>
    );
} 