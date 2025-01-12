import React from 'react';
import { ChakraProvider, Box, VStack, Heading, Button, useColorModeValue, Text, HStack, Link, Icon } from '@chakra-ui/react';
import { Web3Provider, useWeb3 } from './context/Web3Context';
import NFTGallery from './components/NFTGallery';
import { FaTwitter, FaGlobe } from 'react-icons/fa';
import AboutPage from './components/AboutPage';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
    return (
        <ChakraProvider>
            <BrowserRouter>
                <Web3Provider>
                    <AppContent />
                </Web3Provider>
            </BrowserRouter>
        </ChakraProvider>
    );
}

function AppContent() {
    const { account, connectWallet, loading } = useWeb3();
    const bgColor = useColorModeValue('gray.50', 'gray.900');
    const infoBg = useColorModeValue('blue.50', 'blue.900');
    const borderColor = useColorModeValue('blue.200', 'blue.700');
    const explanationBg = useColorModeValue('blue.50', 'blue.900');
    const explanationTextColor = useColorModeValue('blue.600', 'blue.200');
    const footerBg = useColorModeValue('gray.100', 'gray.800');
    const footerText = useColorModeValue('gray.600', 'gray.400');
    const linkColor = useColorModeValue('blue.500', 'blue.300');

    if (loading) {
        return <Box p={8}>Loading...</Box>;
    }

    return (
        <Box minH="100vh" bg={bgColor} position="relative" pb="100px">
            <VStack spacing={8} p={8} maxW="1200px" mx="auto">
                <Navbar />
                <Routes>
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/" element={
                        <>
                            <Heading 
                                size="2xl" 
                                textAlign="center" 
                                mb={4}
                                letterSpacing="wide"
                                fontSize="36px"
                            >
                                Sonic Frog BTE 🐸
                            </Heading>

                            <Box
                                p={6}
                                bg={explanationBg}
                                borderRadius="xl"
                                maxW="800px"
                                w="100%"
                                textAlign="center"
                            >
                                <Text
                                    fontSize="xl"
                                    fontWeight="bold"
                                    mb={4}
                                    color={explanationTextColor}
                                >
                                    🌟 Bid to Earn System 🌟
                                </Text>
                                <Text fontSize="md" mb={3}>
                                    Every bid you place has a chance to earn rewards! When someone outbids you:
                                </Text>
                                <VStack spacing={2} mb={4}>
                                    <Text>✨ Get your full bid amount back</Text>
                                    <Text>💰 Earn 10% of the new bid as bonus</Text>
                                </VStack>
                                <Text fontSize="sm" fontStyle="italic">
                                    Example: If you bid 100 $S and someone bids 150 $S, you'll receive your 100 $S back plus 15 $S reward!
                                </Text>
                            </Box>

                            {!account ? (
                                <Button
                                    onClick={connectWallet}
                                    size="lg"
                                    colorScheme="blue"
                                    fontSize="18px"
                                >
                                    Connect Wallet
                                </Button>
                            ) : (
                                <>
                                    <Box
                                        p={8}
                                        bg={infoBg}
                                        borderRadius="xl"
                                        borderWidth="1px"
                                        borderColor={borderColor}
                                        maxW="800px"
                                        w="100%"
                                    >
                                        <Text fontSize="md" mb={4}>
                                            Connected Account: {account.slice(0, 6)}...{account.slice(-4)}
                                        </Text>
                                    </Box>
                                    <NFTGallery />
                                </>
                            )}
                        </>
                    } />
                </Routes>
            </VStack>

            <Box
                position="absolute"
                bottom="0"
                w="100%"
                bg={footerBg}
                py={6}
                borderTop="1px"
                borderColor={borderColor}
            >
                <VStack spacing={2}>
                    <Text 
                        fontSize="md" 
                        color={footerText}
                        display="flex"
                        alignItems="center"
                        gap={2}
                    >
                        Made with 🐸 by TELLfromMARS
                    </Text>
                    <HStack spacing={4}>
                        <Link
                            href="https://x.com/TELLfromMARS"
                            isExternal
                            color={linkColor}
                            fontSize="sm"
                            _hover={{ textDecoration: 'underline' }}
                            display="flex"
                            alignItems="center"
                        >
                            <Icon as={FaTwitter} mr={1} />
                            Twitter
                        </Link>
                        <Link
                            href="https://tellfrommars.xyz/"
                            isExternal
                            color={linkColor}
                            fontSize="sm"
                            _hover={{ textDecoration: 'underline' }}
                            display="flex"
                            alignItems="center"
                        >
                            <Icon as={FaGlobe} mr={1} />
                            Website
                        </Link>
                    </HStack>
                </VStack>
            </Box>
        </Box>
    );
}

export default App; 