import {
    Box,
    VStack,
    Heading,
    Text,
    Container,
    SimpleGrid,
    Badge,
    Button,
    Image,
    HStack,
    Input,
    Select,
    InputGroup,
    InputLeftElement,
    useColorModeValue,
    Alert,
    AlertIcon,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
} from '@chakra-ui/react';
import { MdSearch, MdVerified } from 'react-icons/md';

const MarketplacePage = () => {
    const bgColor = useColorModeValue('gray.50', 'gray.900');
    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const statBg = useColorModeValue('blue.50', 'blue.900');
    const accentColor = useColorModeValue('blue.500', 'blue.300');

    // Featured Collections data
    const featuredCollections = [
        { 
            id: 1, 
            name: "Sonic Frogs", 
            floorPrice: "800", 
            volume: "450K",
            items: "10,000",
            image: "https://placehold.co/400x200/png?text=Sonic+Frogs"
        },
        { 
            id: 2, 
            name: "Pixel Frogs", 
            floorPrice: "500", 
            volume: "280K",
            items: "5,000",
            image: "https://placehold.co/400x200/png?text=Pixel+Frogs"
        },
        { 
            id: 3, 
            name: "Space Frogs", 
            floorPrice: "1,200", 
            volume: "820K",
            items: "3,333",
            image: "https://placehold.co/400x200/png?text=Space+Frogs"
        },
    ];

    // Dummy NFT data
    const dummyNFTs = [
        { id: 1, name: "Sonic Frog #001", price: "1,000", image: "https://placehold.co/300x300/png?text=Frog+NFT", collection: "Sonic Frogs" },
        { id: 2, name: "Pixel Frog #042", price: "800", image: "https://placehold.co/300x300/png?text=Pixel+Frog", collection: "Pixel Frogs" },
        { id: 3, name: "Space Frog #123", price: "1,200", image: "https://placehold.co/300x300/png?text=Space+Frog", collection: "Space Frogs" },
        { id: 4, name: "Cyber Frog #007", price: "950", image: "https://placehold.co/300x300/png?text=Cyber+Frog", collection: "Cyber Frogs" },
    ];

    return (
        <Box bg={bgColor} minH="100vh" py={12}>
            <Container maxW="6xl">
                <VStack spacing={8} align="stretch">
                    {/* Hero Section with Coming Soon Badge */}
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
                            Sonic NFT Marketplace
                        </Heading>
                        <Text fontSize="xl" color={accentColor}>
                            The Premier NFT Trading Platform on Sonic Chain
                        </Text>
                    </Box>

                    {/* Featured Collections */}
                    <Box
                        bg={cardBg}
                        p={8}
                        borderRadius="xl"
                        borderWidth="1px"
                        borderColor={borderColor}
                    >
                        <Heading size="lg" mb={6}>
                            Featured Collections
                        </Heading>
                        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                            {featuredCollections.map((collection) => (
                                <Box
                                    key={collection.id}
                                    bg={statBg}
                                    borderRadius="lg"
                                    overflow="hidden"
                                    borderWidth="1px"
                                    borderColor={borderColor}
                                >
                                    <Image
                                        src={collection.image}
                                        alt={collection.name}
                                        w="100%"
                                        h="120px"
                                        objectFit="cover"
                                    />
                                    <Box p={4}>
                                        <HStack justify="space-between" mb={2}>
                                            <Heading size="md">{collection.name}</Heading>
                                            <MdVerified color="blue" />
                                        </HStack>
                                        <SimpleGrid columns={2} spacing={4}>
                                            <Box>
                                                <Text fontSize="sm" color="gray.500">Floor Price</Text>
                                                <Text fontWeight="bold">{collection.floorPrice} S</Text>
                                            </Box>
                                            <Box>
                                                <Text fontSize="sm" color="gray.500">Volume</Text>
                                                <Text fontWeight="bold">{collection.volume} S</Text>
                                            </Box>
                                            <Box>
                                                <Text fontSize="sm" color="gray.500">Items</Text>
                                                <Text fontWeight="bold">{collection.items}</Text>
                                            </Box>
                                            <Box>
                                                <Button
                                                    colorScheme="blue"
                                                    size="sm"
                                                    w="100%"
                                                    isDisabled
                                                >
                                                    View
                                                </Button>
                                            </Box>
                                        </SimpleGrid>
                                    </Box>
                                </Box>
                            ))}
                        </SimpleGrid>
                    </Box>

                    {/* Marketplace Stats */}
                    <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6}>
                        <Box p={6} bg={statBg} borderRadius="lg">
                            <Stat>
                                <StatLabel>Total Volume</StatLabel>
                                <StatNumber>1.2M S</StatNumber>
                                <StatHelpText>+12.3% from last week</StatHelpText>
                            </Stat>
                        </Box>
                        <Box p={6} bg={statBg} borderRadius="lg">
                            <Stat>
                                <StatLabel>Floor Price</StatLabel>
                                <StatNumber>800 S</StatNumber>
                                <StatHelpText>Across all collections</StatHelpText>
                            </Stat>
                        </Box>
                        <Box p={6} bg={statBg} borderRadius="lg">
                            <Stat>
                                <StatLabel>Items Listed</StatLabel>
                                <StatNumber>2,450</StatNumber>
                                <StatHelpText>Active listings</StatHelpText>
                            </Stat>
                        </Box>
                        <Box p={6} bg={statBg} borderRadius="lg">
                            <Stat>
                                <StatLabel>Owners</StatLabel>
                                <StatNumber>1,230</StatNumber>
                                <StatHelpText>Unique holders</StatHelpText>
                            </Stat>
                        </Box>
                    </SimpleGrid>

                    {/* Search and Filter Section */}
                    <Box
                        bg={cardBg}
                        p={6}
                        borderRadius="xl"
                        borderWidth="1px"
                        borderColor={borderColor}
                    >
                        <HStack spacing={4}>
                            <InputGroup>
                                <InputLeftElement pointerEvents="none">
                                    <MdSearch color="gray.300" />
                                </InputLeftElement>
                                <Input placeholder="Search items, collections, and accounts" />
                            </InputGroup>
                            <Select placeholder="Price Range" w="200px">
                                <option value="low">Under 500 S</option>
                                <option value="mid">500-1000 S</option>
                                <option value="high">Over 1000 S</option>
                            </Select>
                            <Select placeholder="Sort By" w="200px">
                                <option value="recent">Recently Listed</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                            </Select>
                        </HStack>
                    </Box>

                    {/* Preview Alert - Updated text */}
                    <Alert status="warning">
                        <AlertIcon />
                        This marketplace is coming soon! Trading functionality will be available at launch.
                    </Alert>

                    {/* Marketplace Tabs */}
                    <Tabs>
                        <TabList>
                            <Tab>All Items</Tab>
                            <Tab>Art</Tab>
                            <Tab>Collectibles</Tab>
                            <Tab>Gaming</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
                                    {dummyNFTs.map((nft) => (
                                        <Box
                                            key={nft.id}
                                            bg={cardBg}
                                            borderRadius="lg"
                                            overflow="hidden"
                                            borderWidth="1px"
                                            borderColor={borderColor}
                                        >
                                            <Image
                                                src={nft.image}
                                                alt={nft.name}
                                                w="100%"
                                                h="300px"
                                                objectFit="cover"
                                            />
                                            <Box p={4}>
                                                <HStack justify="space-between" mb={2}>
                                                    <Badge colorScheme="purple">{nft.collection}</Badge>
                                                    <MdVerified color="blue" />
                                                </HStack>
                                                <Heading size="md" mb={2}>
                                                    {nft.name}
                                                </Heading>
                                                <HStack justify="space-between">
                                                    <Text>{nft.price} S</Text>
                                                    <Button
                                                        colorScheme="blue"
                                                        size="sm"
                                                        isDisabled
                                                    >
                                                        Buy Now
                                                    </Button>
                                                </HStack>
                                            </Box>
                                        </Box>
                                    ))}
                                </SimpleGrid>
                            </TabPanel>
                            <TabPanel>
                                <Text color="gray.500" textAlign="center">Art category coming soon</Text>
                            </TabPanel>
                            <TabPanel>
                                <Text color="gray.500" textAlign="center">Collectibles category coming soon</Text>
                            </TabPanel>
                            <TabPanel>
                                <Text color="gray.500" textAlign="center">Gaming category coming soon</Text>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </VStack>
            </Container>
        </Box>
    );
};

export default MarketplacePage; 