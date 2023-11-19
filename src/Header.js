import { Box, Image, HStack, Spacer } from '@chakra-ui/react';
import lectra from '../src/imgAssets/lectra.png';
import gerber from '../src/imgAssets/gerber.png';

const Header = () => {
  return (
    <>
      <Box bg='none' pos='absolute' h='60px' w='100vw' px='50px'>
        <HStack justify='space-between' w='full' h='full'>
          <Image maxH='40px' maxW='120px' src={lectra} />
          <Spacer />
          <Image maxH='40px' src={gerber} />
        </HStack>
      </Box>
    </>
  );
};

export default Header;
