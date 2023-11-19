import React from 'react';
import { Box, Center, VStack, Image } from '@chakra-ui/react';
import InteractiveSvg from './InteractiveSvg';
import bg from '../src/imgAssets/bg.jpg';

const Home = () => {
  return (
    <>
      <Box bg='black'>
        <Box
          w='100vw'
          h='100vh'
          backgroundImage={bg}
          backgroundSize='cover'
          opacity='75%'
          backgroundPosition='center'
          backgroundRepeat='no-repeat'
          color='white'
          display='flex'
          justifyContent='center'
          alignItems='center'>
          <Center>
            <VStack>
              <InteractiveSvg />
            </VStack>
          </Center>
        </Box>
      </Box>
    </>
  );
};

export default Home;
