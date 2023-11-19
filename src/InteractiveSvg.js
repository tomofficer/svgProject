import { useState } from 'react';
import { Box, VStack } from '@chakra-ui/react';

const InteractiveSvg = () => {
  const [width, setWidth] = useState(100); // Default width
  const [height, setHeight] = useState(100); // Default height
  const [position, setPosition] = useState({ x: 50, y: 50 }); // Default position

  const handleWidthChange = (e) => {
    setWidth(e.target.value);
  };

  const handleHeightChange = (e) => {
    setHeight(e.target.value);
  };

  const handlePositionChange = (e) => {
    setPosition({ ...position, [e.target.name]: e.target.value });
  };

  return (
    <Box>
      <VStack
        spacing='20px'
        border='2px solid black'
        px='50px'
        py='50px'
        borderRadius='40px'>
        <label>
          Width:
          <input
            type='range'
            min='50'
            max='200'
            value={width}
            onChange={handleWidthChange}
          />
        </label>
        <label>
          Height:
          <input
            type='range'
            min='50'
            max='200'
            value={height}
            onChange={handleHeightChange}
          />
        </label>
        <label>
          <span style={{ marginRight: '10px' }}>X Position:</span>
          <input
            type='number'
            name='x'
            value={position.x}
            onChange={handlePositionChange}
            style={{
              background: 'none',
              border: '2px solid black',
              borderRadius: '68px',
            }}
          />
        </label>
        <label>
          <span style={{ marginRight: '10px' }}>Y Position:</span>
          <input
            type='number'
            name='y'
            value={position.y}
            onChange={handlePositionChange}
            style={{
              background: 'none',
              border: '2px solid black',
              borderRadius: '68px',
            }}
          />
        </label>
      </VStack>

      <svg style={{ position: 'absolute', left: position.x, top: position.y }}>
        <rect width={width} height={height} fill='lightblue' />
      </svg>
    </Box>
  );
};

export default InteractiveSvg;
