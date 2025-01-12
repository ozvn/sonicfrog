import React from 'react';
import { Button, useToast, VStack, Text } from '@chakra-ui/react';
import { useWeb3 } from '../context/Web3Context';

export default function MintNFT({ onMintSuccess }) {
    const { account, nftContract } = useWeb3();
    const toast = useToast();

    const mintNFT = async () => {
        try {
            if (!nftContract) {
                throw new Error("Contract not initialized");
            }

            const tx = await nftContract.mint(account);
            await tx.wait();

            toast({
                title: "Success",
                description: "NFT successfully minted!",
                status: "success",
                duration: 5000,
                isClosable: true,
            });

            if (onMintSuccess) {
                onMintSuccess();
            }
        } catch (error) {
            console.error("Mint error:", error);
            toast({
                title: "Error",
                description: error.message || "Failed to mint NFT. Please try again.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <VStack spacing={4} w="100%" maxW="600px" mx="auto" p={4}>
            <Text fontSize="lg" textAlign="center">
                Mint a new Frog NFT to start participating in auctions!
            </Text>
            <Button
                onClick={mintNFT}
                colorScheme="green"
                size="lg"
                w="100%"
                fontSize="xl"
                py={8}
            >
                Mint NFT
            </Button>
        </VStack>
    );
} 