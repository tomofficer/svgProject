import { Box, Center, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <>
      <Box
        borderTop='1px solid white'
        // borderTop='2px solid #03fcc2'
        py='3px'
        backdropFilter='blur(10px)'
        bg='black'
        w='100vw'
        // pos='absolute'
        // bottom='0'
        color='white'>
        <Center>
          <Text>© Tom Officer Web Dev 2023</Text>
        </Center>
      </Box>
    </>
  );
};

export default Footer;
