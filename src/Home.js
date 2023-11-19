import React from 'react';
import { Box, Center, Text } from '@chakra-ui/react';
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
            <InteractiveSvg />
          </Center>
          {/* <Box
            borderTop='2px solid #03fcc2'
            backdropFilter='blur(10px)'
            bg='none'
            w='100vw'
            pos='absolute'
            bottom='0'
            color='white'>
            <Center>
              <Text>© Tom Officer 2023</Text>
            </Center>
          </Box> */}
        </Box>
      </Box>
    </>
  );
};

export default Home;
