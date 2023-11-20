import { Box, Center, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <>
      <Box
        backdropFilter='blur(10px)'
        bg='none'
        w='100vw'
        pos='absolute'
        bottom='0'
        color='gray.400'>
        <Center>
          <Text>© Tom Officer Web Dev 2023</Text>
        </Center>
      </Box>
    </>
  );
};

export default Footer;
