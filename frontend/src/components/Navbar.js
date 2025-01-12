import { Link, HStack, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
    const linkColor = useColorModeValue('gray.700', 'white');
    const hoverColor = useColorModeValue('blue.500', 'blue.300');

    return (
        <HStack spacing={8} py={4} w="100%" justify="center">
            <Link 
                as={RouterLink} 
                to="/"
                color={linkColor}
                fontWeight="medium"
                fontSize="lg"
                _hover={{ color: hoverColor, textDecoration: 'none' }}
            >
                Home
            </Link>
            <Link 
                as={RouterLink} 
                to="/about"
                color={linkColor}
                fontWeight="medium"
                fontSize="lg"
                _hover={{ color: hoverColor, textDecoration: 'none' }}
            >
                About
            </Link>
        </HStack>
    );
};

export default Navbar; 