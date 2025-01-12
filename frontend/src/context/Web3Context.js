import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { BrowserProvider, Contract } from 'ethers';
import FrogNFT from '../contracts/FrogNFT.json';
import FrogAuction from '../contracts/FrogAuction.json';
import { useToast } from '@chakra-ui/react';

const Web3Context = createContext();

export function useWeb3() {
    return useContext(Web3Context);
}

const NFT_CONTRACT_ADDRESS = process.env.REACT_APP_NFT_CONTRACT_ADDRESS;
const AUCTION_CONTRACT_ADDRESS = process.env.REACT_APP_AUCTION_CONTRACT_ADDRESS;

export function Web3Provider({ children }) {
    const [account, setAccount] = useState(null);
    const [nftContract, setNftContract] = useState(null);
    const [auctionContract, setAuctionContract] = useState(null);
    const [loading, setLoading] = useState(true);
    const toast = useToast();

    const connectWallet = useCallback(async () => {
        try {
            if (!window.ethereum) {
                alert('Please install MetaMask!');
                return;
            }

            const provider = new BrowserProvider(window.ethereum);
            
            const sonicChainId = '0x92';  // 146 decimal
            
            const network = await provider.getNetwork();
            const currentChainId = '0x' + network.chainId.toString(16);
            
            if (currentChainId !== sonicChainId) {
                toast({
                    title: "Wrong Network",
                    description: "Switching to Sonic Chain...",
                    status: "info",
                    duration: 3000,
                    isClosable: true,
                });

                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: sonicChainId }],
                    });
                    
                    window.location.reload();
                    return;
                    
                } catch (switchError) {
                    if (switchError.code === 4902) {
                        try {
                            await window.ethereum.request({
                                method: 'wallet_addEthereumChain',
                                params: [{
                                    chainId: sonicChainId,
                                    chainName: 'Sonic Chain',
                                    nativeCurrency: {
                                        name: 'Sonic',
                                        symbol: 'S',
                                        decimals: 18
                                    },
                                    rpcUrls: ['https://rpc.sonic.fantom.network/'],
                                    blockExplorerUrls: ['https://explorer.sonic.fantom.network/']
                                }]
                            });
                            
                            window.location.reload();
                            return;
                            
                        } catch (addError) {
                            toast({
                                title: "Network Error",
                                description: "Failed to add Sonic network to MetaMask. Please add it manually.",
                                status: "error",
                                duration: 5000,
                                isClosable: true,
                            });
                            throw new Error('Failed to add Sonic network to MetaMask');
                        }
                    } else {
                        toast({
                            title: "Network Error",
                            description: "Please switch to Sonic network to use this application.",
                            status: "warning",
                            duration: 5000,
                            isClosable: true,
                        });
                        throw new Error('Please switch to Sonic network');
                    }
                }
            }

            const accounts = await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();

            const nftContractInstance = new Contract(
                NFT_CONTRACT_ADDRESS,
                FrogNFT,
                signer
            );

            const auctionContractInstance = new Contract(
                AUCTION_CONTRACT_ADDRESS,
                FrogAuction,
                signer
            );

            setAccount(accounts[0]);
            setNftContract(nftContractInstance);
            setAuctionContract(auctionContractInstance);

            window.ethereum.on('chainChanged', () => {
                window.location.reload();
            });

            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                } else {
                    setAccount(null);
                }
            });

        } catch (error) {
            console.error('Connection error:', error);
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    }, [toast]);

    useEffect(() => {
        const init = async () => {
            try {
                if (window.ethereum && window.ethereum.selectedAddress) {
                    await connectWallet();
                }
            } catch (error) {
                console.error("Initialization error:", error);
            } finally {
                setLoading(false);
            }
        };

        init();
    }, [connectWallet]);

    const value = {
        account,
        nftContract,
        auctionContract,
        connectWallet,
        loading
    };

    return (
        <Web3Context.Provider value={value}>
            {children}
        </Web3Context.Provider>
    );
} 