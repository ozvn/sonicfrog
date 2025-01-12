import { Box, HStack, Link as ChakraLink } from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    
    return (
        <Box w="100%" py={4}>
            <HStack spacing={8} justify="center">
                <ChakraLink
                    as={RouterLink}
                    to="/"
                    fontWeight={location.pathname === '/' ? 'bold' : 'normal'}
                >
                    Home
                </ChakraLink>
                <ChakraLink
                    as={RouterLink}
                    to="/about"
                    fontWeight={location.pathname === '/about' ? 'bold' : 'normal'}
                >
                    About
                </ChakraLink>
                <ChakraLink
                    as={RouterLink}
                    to="/launch"
                    fontWeight={location.pathname === '/launch' ? 'bold' : 'normal'}
                >
                    Launch
                </ChakraLink>
                <ChakraLink
                    as={RouterLink}
                    to="/marketplace"
                    fontWeight={location.pathname === '/marketplace' ? 'bold' : 'normal'}
                >
                    Marketplace
                </ChakraLink>
            </HStack>
        </Box>
    );
};

export default Navbar; 