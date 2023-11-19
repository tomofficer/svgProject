import React from 'react';
import { Box, Center, VStack, Image } from '@chakra-ui/react';
import InteractiveSvg from './InteractiveSvg';
import logo from '../src/imgAssets/lectralogo.png';

const Home = () => {
  return (
    <>
      <Box
        w='100vw'
        h='100vh'
        bg='gray.500'
        color='white'
        display='flex'
        justifyContent='center'
        alignItems='center'>
        <Center>
          {/* <Image mt='100px' mb='100px' src={logo} pos='absolute' /> */}
          <VStack>
            <InteractiveSvg />
          </VStack>
        </Center>
      </Box>
    </>
  );
};

export default Home;
