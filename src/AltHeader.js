import { Box, Image, HStack, Spacer, Button } from '@chakra-ui/react';
import lectra from '../src/imgAssets/lectra.png';
import { useNavigate } from 'react-router-dom';

const AltHeader = () => {
  //Navigation Variables
  const navigate = useNavigate();

  //Navigation Handlers
  const handleNavigate = () => {
    navigate('/'); // Navigate to '/alt-ui' on click
  };

  return (
    <>
      <Box bg='none' pos='absolute' h='70px' w='100vw' px='30px' zIndex='100'>
        <HStack justify='space-between' w='full' h='full'>
          <Image maxH='40px' maxW='120px' src={lectra} />
          <Spacer />
          <Button
            bg='black'
            color='white'
            onClick={handleNavigate}
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

export default AltHeader;
