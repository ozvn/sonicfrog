import {
    Box,
    VStack,
    Heading,
    Text,
    Container,
    List,
    ListItem,
    ListIcon,
    Button,
    useColorModeValue,
    Badge,
    HStack,
    Input,
    FormControl,
    FormLabel,
    NumberInput,
    NumberInputField,
    Alert,
    AlertIcon,
} from '@chakra-ui/react';
import { MdCheckCircle, MdLaunch } from 'react-icons/md';

const LaunchPage = () => {
    const bgColor = useColorModeValue('gray.50', 'gray.900');
    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const accentColor = useColorModeValue('blue.500', 'blue.300');

    return (
        <Box bg={bgColor} minH="100vh" py={12}>
            <Container maxW="4xl">
                <VStack spacing={8} align="stretch">
                    {/* Hero Section */}
                    <Box textAlign="center" mb={8}>
                        <Badge 
                            colorScheme="purple" 
                            fontSize="lg" 
                            p={2} 
                            borderRadius="full" 
                            mb={4}
                        >
                            Coming Soon
                        </Badge>
                        <Heading size="2xl" mb={4}>
                            Launch Your Project on Sonic BTE
                        </Heading>
                        <Text fontSize="xl" color={accentColor}>
                            The Future of NFT Launches on Sonic Chain
                        </Text>
                    </Box>

                    {/* Demo Launch Interface - Moved to top */}
                    <Box
                        bg={cardBg}
                        p={8}
                        borderRadius="xl"
                        borderWidth="1px"
                        borderColor={borderColor}
                    >
                        <Heading size="lg" mb={6}>
                            Launch Interface Preview
                        </Heading>
                        <Alert status="warning" mb={6}>
                            <AlertIcon />
                            This is a preview interface. Launching functionality is coming soon.
                        </Alert>
                        <VStack spacing={6}>
                            <FormControl>
                                <FormLabel>Project Name</FormLabel>
                                <Input placeholder="Enter your project name" isDisabled />
                            </FormControl>

                            <FormControl>
                                <FormLabel>NFT Type</FormLabel>
                                <HStack spacing={4}>
                                    <Button
                                        flex="1"
                                        isDisabled
                                        variant="outline"
                                        colorScheme="blue"
                                        opacity={0.8}
                                    >
                                        On-Chain NFT
                                    </Button>
                                    <Button
                                        flex="1"
                                        isDisabled
                                        variant="outline"
                                        colorScheme="blue"
                                        opacity={0.8}
                                    >
                                        IPFS NFT
                                    </Button>
                                </HStack>
                            </FormControl>

                            <FormControl>
                                <FormLabel>NFT Contract Address</FormLabel>
                                <Input 
                                    placeholder="Enter your NFT contract address (0x...)" 
                                    isDisabled 
                                />
                                <Text fontSize="sm" color="gray.500" mt={1}>
                                    Make sure your contract is verified on Sonic Explorer
                                </Text>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Collection Size</FormLabel>
                                <NumberInput isDisabled>
                                    <NumberInputField placeholder="Enter collection size" />
                                </NumberInput>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Minimum Bid (S)</FormLabel>
                                <NumberInput isDisabled>
                                    <NumberInputField placeholder="Enter minimum bid amount" />
                                </NumberInput>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Auction Duration (days)</FormLabel>
                                <NumberInput isDisabled>
                                    <NumberInputField placeholder="Enter auction duration" />
                                </NumberInput>
                            </FormControl>

                            <Button
                                leftIcon={<MdLaunch />}
                                colorScheme="blue"
                                size="lg"
                                width="100%"
                                isDisabled
                            >
                                Launch Project
                            </Button>
                        </VStack>
                    </Box>

                    {/* Platform Overview */}
                    <Box
                        bg={cardBg}
                        p={8}
                        borderRadius="xl"
                        borderWidth="1px"
                        borderColor={borderColor}
                    >
                        <Heading size="lg" mb={6}>
                            Platform Overview
                        </Heading>
                        <Text mb={4}>
                            We're transforming our successful BTE system into a comprehensive marketplace 
                            where creators can launch their NFT projects with built-in bid-to-earn mechanics.
                        </Text>
                        <Text mb={4}>
                            Sonic Frogs, as founding NFTs, will receive revenue share from all future launches 
                            on the platform, creating a sustainable ecosystem where early supporters benefit 
                            from the platform's growth.
                        </Text>
                    </Box>

                    {/* Key Features */}
                    <Box
                        bg={cardBg}
                        p={8}
                        borderRadius="xl"
                        borderWidth="1px"
                        borderColor={borderColor}
                    >
                        <Heading size="lg" mb={6}>
                            Key Features
                        </Heading>
                        <List spacing={4}>
                            <ListItem>
                                <ListIcon as={MdCheckCircle} color="green.500" />
                                Self-service BTE launch platform
                            </ListItem>
                            <ListItem>
                                <ListIcon as={MdCheckCircle} color="green.500" />
                                Revenue sharing with Sonic Frog holders
                            </ListItem>
                            <ListItem>
                                <ListIcon as={MdCheckCircle} color="green.500" />
                                Customizable auction parameters
                            </ListItem>
                            <ListItem>
                                <ListIcon as={MdCheckCircle} color="green.500" />
                                Built-in royalty distribution
                            </ListItem>
                        </List>
                    </Box>

                    {/* Revenue Model */}
                    <Box
                        bg={cardBg}
                        p={8}
                        borderRadius="xl"
                        borderWidth="1px"
                        borderColor={borderColor}
                    >
                        <Heading size="lg" mb={6}>
                            Revenue Model
                        </Heading>
                        <VStack align="stretch" spacing={4}>
                            <HStack justify="space-between" p={4} bg="gray.100" borderRadius="md">
                                <Text fontWeight="bold">Platform Fee</Text>
                                <Text>2.5%</Text>
                            </HStack>
                            <HStack justify="space-between" p={4} bg="gray.100" borderRadius="md">
                                <Text fontWeight="bold">Sonic Frogs Revenue Share</Text>
                                <Text>1%</Text>
                            </HStack>
                            <HStack justify="space-between" p={4} bg="gray.100" borderRadius="md">
                                <Text fontWeight="bold">Creator Revenue</Text>
                                <Text>96.5%</Text>
                            </HStack>
                        </VStack>
                    </Box>

                    {/* Contact Section */}
                    <Box
                        bg={cardBg}
                        p={8}
                        borderRadius="xl"
                        borderWidth="1px"
                        borderColor={borderColor}
                        textAlign="center"
                    >
                        <Heading size="lg" mb={6}>
                            Interested in Launching?
                        </Heading>
                        <Text mb={6}>
                            Get early access to our launch platform and be among the first projects 
                            to benefit from our BTE ecosystem.
                        </Text>
                        <Button
                            as="a"
                            href="https://x.com/TELLfromMARS"
                            colorScheme="blue"
                            size="lg"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Contact Us
                        </Button>
                    </Box>
                </VStack>
            </Container>
        </Box>
    );
};

export default LaunchPage; 