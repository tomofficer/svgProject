import { Box, Image } from '@chakra-ui/react';
import logo from '../src/imgAssets/lectralogo.png';

const Header = () => {
  return (
    <>
      <Box bg='none' pos='absolute'>
        <Image maxW='200px' src={logo} />
      </Box>
    </>
  );
};

export default Header;
