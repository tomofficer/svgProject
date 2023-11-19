import { Box, Image, HStack, Spacer } from '@chakra-ui/react';
import lectra from '../src/imgAssets/lectra.png';
import gerber from '../src/imgAssets/gerber.png';

const Header = () => {
  //Image Styling
  const imgGlow = {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.6)',
  };
  return (
    <>
      <Box bg='none' pos='absolute' h='60px' w='100vw' px='50px'>
        <HStack justify='space-between' w='full' h='full'>
          <Image maxH='40px' maxW='120px' src={lectra} style={imgGlow} />
          <Spacer />
          <Image maxH='40px' src={gerber} style={imgGlow} />
        </HStack>
      </Box>
    </>
  );
};

export default Header;
