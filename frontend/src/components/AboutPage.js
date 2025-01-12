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
} from '@chakra-ui/react';
import { MdCheckCircle, MdStars, MdTrendingUp } from 'react-icons/md';

const AboutPage = () => {
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
                        <Heading size="2xl" mb={4}>
                            Sonic Frog
                        </Heading>
                        <Heading size="xl" mb={4}>
                            Bid to Earn Platform
                        </Heading>
                        <Text fontSize="xl" color={accentColor}>
                            The Future of NFT Auctions on Sonic Chain
                        </Text>
                    </Box>

                    {/* How It Works Section */}
                    <Box
                        bg={cardBg}
                        p={8}
                        borderRadius="xl"
                        borderWidth="1px"
                        borderColor={borderColor}
                    >
                        <Heading size="lg" mb={6}>
                            How Bid to Earn Works
                        </Heading>
                        <List spacing={4}>
                            <ListItem>
                                <ListIcon as={MdCheckCircle} color="green.500" />
                                Place a bid on any NFT in auction
                            </ListItem>
                            <ListItem>
                                <ListIcon as={MdCheckCircle} color="green.500" />
                                When someone outbids you:
                                <List pl={10} mt={2}>
                                    <ListItem>• Get your full bid amount back</ListItem>
                                    <ListItem>• Earn 10% of the new bid as reward</ListItem>
                                </List>
                            </ListItem>
                            <ListItem>
                                <ListIcon as={MdCheckCircle} color="green.500" />
                                The more you bid, the more you can earn!
                            </ListItem>
                        </List>
                    </Box>

                    {/* Future Updates Section */}
                    <Box
                        bg={cardBg}
                        p={8}
                        borderRadius="xl"
                        borderWidth="1px"
                        borderColor={borderColor}
                    >
                        <Heading size="lg" mb={6}>
                            Coming Soon: Platform Evolution
                        </Heading>
                        <VStack align="stretch" spacing={4}>
                            <Text>
                                We're evolving into a comprehensive Bid to Earn platform where creators can launch their own BTE campaigns. Sonic Frogs will be a founding partner, receiving revenue share from all platform activities.
                            </Text>
                            <List spacing={3}>
                                <ListItem>
                                    <ListIcon as={MdStars} color="purple.500" />
                                    Creator-driven BTE launches
                                </ListItem>
                                <ListItem>
                                    <ListIcon as={MdStars} color="purple.500" />
                                    Revenue sharing model
                                </ListItem>
                                <ListItem>
                                    <ListIcon as={MdStars} color="purple.500" />
                                    Integrated marketplace
                                </ListItem>
                            </List>
                        </VStack>
                    </Box>

                    {/* Marketplace & Partnerships Section */}
                    <Box
                        bg={cardBg}
                        p={8}
                        borderRadius="xl"
                        borderWidth="1px"
                        borderColor={borderColor}
                    >
                        <Heading size="lg" mb={6}>
                            Marketplace & Partnerships
                        </Heading>
                        <VStack align="stretch" spacing={4}>
                            <Text>
                                We're currently in development of our own marketplace, which will be launched soon. All NFTs from BTE campaigns will be tradeable on our platform.
                            </Text>
                            <Text>
                                Additionally, we're open to partnerships with existing marketplaces on the Sonic Chain. This could provide immediate liquidity and trading options for our users.
                            </Text>
                            <List spacing={3}>
                                <ListItem>
                                    <ListIcon as={MdTrendingUp} color="blue.500" />
                                    Native marketplace in development
                                </ListItem>
                                <ListItem>
                                    <ListIcon as={MdTrendingUp} color="blue.500" />
                                    Partnership opportunities available
                                </ListItem>
                                <ListItem>
                                    <ListIcon as={MdTrendingUp} color="blue.500" />
                                    Integrated trading solutions
                                </ListItem>
                            </List>
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
                            Partner With Us
                        </Heading>
                        <Text mb={6}>
                            Are you a marketplace on Sonic Chain? We're actively seeking partnerships to enhance the NFT ecosystem. Get in touch with us to discuss collaboration opportunities.
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

export default AboutPage; 