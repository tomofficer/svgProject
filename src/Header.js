import { Box, Image, HStack, Spacer, Button } from '@chakra-ui/react';
import lectra from '../src/imgAssets/lectranew.png';
import gerber from '../src/imgAssets/gerber.png';

const Header = () => {
  //Image Styling
  const imgGlow = {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.6)',
  };
  return (
    <>
      <Box bg='none' pos='absolute' h='70px' w='100vw' px='30px' zIndex='100'>
        <HStack justify='space-between' w='full' h='full'>
          <Image maxH='40px' maxW='120px' src={lectra} />
          <Spacer />
          <Button
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
