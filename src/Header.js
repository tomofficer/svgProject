import { Box, Image, HStack, Spacer, Button } from '@chakra-ui/react';
import lectra from '../src/imgAssets/lectranew.png';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  //Navigation Variables
  const navigate = useNavigate();

  //Navigation Handlers
  const handleNavigate = () => {
    navigate('/alt-ui'); // Navigate to '/alt-ui' on click
  };

  return (
    <>
      <Box bg='none' pos='absolute' h='70px' w='100vw' px='30px' zIndex='100'>
        <HStack justify='space-between' w='full' h='full'>
          <Image maxH='40px' maxW='120px' src={lectra} />
          <Spacer />
          <Button
            onClick={handleNavigate}
            _hover={{
              transform: 'scale(0.96)',
            }}>
            Switch UI
          </Button>
        </HStack>
      </Box>
    </>
  );
};

export default Header;
