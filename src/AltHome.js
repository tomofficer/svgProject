import React from 'react';
import { Box, Center } from '@chakra-ui/react';
import AltUI from './AltUI';
import bg from '../src/imgAssets/bg.jpg';

const AltHome = () => {
  return (
    <>
      <Box pos='relative' w='100vw' h='100vh'>
        {/* Separate background layer with opacity */}
        <Box
          pos='absolute'
          top='0'
          left='0'
          right='0'
          bottom='0'
          // backgroundImage={bg}
          backgroundSize='cover'
          backgroundPosition='center'
          backgroundRepeat='no-repeat'
          opacity='75%'
        />
        {/* Content without reduced opacity */}
        <Box
          pos='relative'
          color='white'
          display='flex'
          justifyContent='center'
          alignItems='center'
          w='full'
          h='full'>
          <Center>
            <AltUI />
          </Center>
        </Box>
      </Box>
    </>
  );
};

export default AltHome;
