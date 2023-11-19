import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  VStack,
  HStack,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Input,
  Text,
  Center,
} from '@chakra-ui/react';
import SvgShape from './SvgShape';
import Typewriter from 'react-typewriter';

const InteractiveSvg = () => {
  //State Variables
  const [width, setWidth] = useState(100); // Default width
  const [height, setHeight] = useState(100); // Default height
  const [position, setPosition] = useState({ x: 200, y: 200 }); // Default position
  const [color, setColor] = useState('lightblue'); //Default color
  const [isDragging, setIsDragging] = useState(false); //Drag state
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 }); //Default drag
  const [shape, setShape] = useState('rect'); // Default shape

  //useEffect Variables
  useEffect(() => {
    const onDrag = (e) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      }
    };

    const handleMouseMove = (e) => {
      onDrag(e);
    };

    const handleMouseUp = () => {
      stopDrag();
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, setPosition]);

  //Change Handlers
  const handleWidthChange = (e) => {
    setWidth(e.target.value);
  };

  const handleHeightChange = (e) => {
    setHeight(e.target.value);
  };

  const handlePositionChange = (e) => {
    setPosition({ ...position, [e.target.name]: e.target.value });
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  //Drag Handlers
  const startDrag = (e) => {
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    setIsDragging(true);
  };

  const onDrag = useCallback(
    (e) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      }
    },
    [isDragging, dragStart]
  );

  const stopDrag = () => {
    setIsDragging(false);
  };

  //Move Handlers
  const moveLeft = () => {
    setPosition((prevPosition) => ({
      ...prevPosition,
      x: prevPosition.x - 50,
    }));
  };

  const moveRight = () => {
    setPosition((prevPosition) => ({
      ...prevPosition,
      x: prevPosition.x + 50,
    }));
  };

  const moveUp = () => {
    setPosition((prevPosition) => ({
      ...prevPosition,
      y: prevPosition.y - 50,
    }));
  };

  const moveDown = () => {
    setPosition((prevPosition) => ({
      ...prevPosition,
      y: prevPosition.y + 50,
    }));
  };

  //Text Command Options
  const movementOptions = ['Move left', 'Move right', 'Move up', 'Move down'];

  //Text Command Handler
  const handleMovementOption = (option) => {
    switch (option) {
      case 'Move left':
        moveLeft();
        break;
      case 'Move right':
        moveRight();
        break;
      case 'Move up':
        moveUp();
        break;
      case 'Move down':
        moveDown();
        break;
      default:
        break;
    }
  };

  //Input Value
  const [inputValue, setInputValue] = useState('');

  //Input Error Handler
  const [showError, setShowError] = useState(false);

  //Input Change Handler
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (showError) {
      setShowError(false); // Hide error message when user starts typing again
    }
  };

  //Input Submit Handler
  const handleInputSubmit = () => {
    if (movementOptions.includes(inputValue)) {
      handleMovementOption(inputValue);
      setInputValue('');
    } else {
      setShowError(true);
    }
  };

  // Key for the Typewriter component
  const [typewriterKey, setTypewriterKey] = useState(0);

  // Increment key to trigger re-render
  const resetTypewriter = () => {
    setTypewriterKey((prevKey) => prevKey + 1);
  };

  return (
    <Box onMouseMove={onDrag} onMouseUp={stopDrag} onMouseLeave={stopDrag}>
      <VStack
        align='left'
        spacing='20px'
        border='2px solid black'
        px='50px'
        py='50px'
        borderRadius='40px'>
        <HStack>
          <Button onClick={moveLeft}>Move Left</Button>
          <Button onClick={moveRight}>Move Right</Button>
          <Button onClick={moveUp}>Move Up</Button>
          <Button onClick={moveDown}>Move Down</Button>
        </HStack>

        <Center>
          <HStack>
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
          </HStack>
        </Center>

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

        <Center>
          <HStack>
            <label>
              <span style={{ marginRight: '10px' }}>Color:</span>
              <input
                type='color'
                value={color}
                onChange={handleColorChange}
                style={{
                  background: 'none',
                  border: '2px solid black',
                  borderRadius: '68px',
                }}
              />
            </label>
            <label>
              <span style={{ marginRight: '10px' }}>Shape:</span>
              <select
                value={shape}
                onChange={(e) => setShape(e.target.value)}
                style={{
                  background: 'none',
                  border: '2px solid black',
                  borderRadius: '68px',
                }}>
                <option value='rect'>Rectangle</option>
                <option value='circle'>Circle</option>
                <option value='ellipse'>Ellipse</option>
                <option value='line'>Line</option>
              </select>
            </label>
          </HStack>
        </Center>

        <Popover onClose={resetTypewriter}>
          <PopoverTrigger>
            <Button>Tell Me Where To Move!</Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody color='black'>
              <Typewriter key={typewriterKey} typing={1}>
                {
                  'Tell me what to do - you can say something like: Move up, Move right, Move left, Move down...'
                }
              </Typewriter>
              <Input
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    handleInputSubmit();
                  }
                }}
                isInvalid={showError}
                errorBorderColor='red.300'
              />
              {showError && (
                <Text color='red.500'>Sorry, I didn't recognize that...</Text>
              )}
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </VStack>

      {/* <svg
        style={{
          position: 'absolute',
          left: position.x,
          top: position.y,
          cursor: 'move',
        }}
        onMouseDown={startDrag}
        width={width}
        height={height}>
        <rect width={width} height={height} fill={color} />
      </svg> */}
      <SvgShape
        shape={shape}
        width={width}
        height={height}
        color={color}
        position={position}
        startDrag={startDrag}
      />
    </Box>
  );
};

export default InteractiveSvg;
