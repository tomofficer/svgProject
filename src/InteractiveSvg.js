import { useState, useEffect, useCallback } from 'react';
import { keyframes } from '@emotion/react';
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
  Tooltip,
  IconButton,
  Image,
} from '@chakra-ui/react';
import '../src/App.css';
import { QuestionIcon } from '@chakra-ui/icons';
import logo from '../src/imgAssets/lectralogo.png';
import SvgShape from './SvgShape';
import Typewriter from 'react-typewriter';

//Pulse Animation Keyframes
const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const InteractiveSvg = () => {
  //State Variables
  const [width, setWidth] = useState(100); // Default width
  const [height, setHeight] = useState(100); // Default height
  const [position, setPosition] = useState({ x: 200, y: 200 }); // Default position
  const [color, setColor] = useState('#03fcc2'); //Default color
  const [isDragging, setIsDragging] = useState(false); //Drag state
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 }); //Default drag
  const [shape, setShape] = useState('rect'); // Default shape
  const [showHelpIcon, setShowHelpIcon] = useState(false); //Tooltip timeout

  //useEffect Variables
  //Drag And Drop
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

  //Tooltip Timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHelpIcon(true);
    }, 1000); // 10 seconds

    return () => clearTimeout(timer); // Cleanup timeout
  }, []);

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
  const movementOptions = [
    'Move left',
    'Move right',
    'Move up',
    'Move down',
    'Change color',
  ];

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

  // Calculate the position of the "?" icon
  const iconPosition = {
    left: position.x + width - 10, // Adjust based on the current width of the SVG
    top: position.y - 10, // Adjust based on the current position of the SVG
  };

  return (
    <Box onMouseMove={onDrag} onMouseUp={stopDrag} onMouseLeave={stopDrag}>
      <VStack
        backdropFilter='blur(10px)'
        align='center'
        spacing='20px'
        border='3px solid #03fcc2'
        px='50px'
        py='50px'
        borderRadius='40px'>
        <Image src={logo} maxW='200px' />
        <HStack mb='20px'>
          <Button
            onClick={moveLeft}
            bg='none'
            border='2px solid #03fcc2'
            borderRadius='15px'
            color='white'
            _hover={{ bg: 'none', transform: 'scale(0.97)' }}>
            Move Left
          </Button>
          <Button
            onClick={moveRight}
            bg='none'
            border='2px solid #03fcc2'
            borderRadius='15px'
            color='white'
            _hover={{ bg: 'none', transform: 'scale(0.97)' }}>
            Move Right
          </Button>
          <Button
            onClick={moveUp}
            bg='none'
            border='2px solid #03fcc2'
            borderRadius='15px'
            color='white'
            _hover={{ bg: 'none', transform: 'scale(0.97)' }}>
            Move Up
          </Button>
          <Button
            onClick={moveDown}
            bg='none'
            border='2px solid #03fcc2'
            borderRadius='15px'
            color='white'
            _hover={{ bg: 'none', transform: 'scale(0.97)' }}>
            Move Down
          </Button>
        </HStack>

        <Center>
          <HStack>
            <label>
              <span style={{ marginRight: '10px' }}>Width:</span>
              <input
                type='range'
                min='50'
                max='200'
                value={width}
                onChange={handleWidthChange}
              />
            </label>
            <label>
              <span style={{ marginRight: '10px' }}>Height:</span>

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

        <HStack>
          <label>
            <span style={{ marginRight: '10px' }}>X Position:</span>
            <input
              type='number'
              name='x'
              value={position.x}
              onChange={handlePositionChange}
              style={{
                background: 'none',
                border: '2px solid #03fcc2',
                borderRadius: '15px',
                width: '100px',
                padding: '5px',
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
                border: '2px solid #03fcc2',
                borderRadius: '15px',
                width: '100px',
                padding: '5px',
              }}
            />
          </label>
        </HStack>

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
                  border: '2px solid #03fcc2',
                  borderRadius: '15px',
                  padding: '5px',
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
                  border: '2px solid #03fcc2',
                  borderRadius: '15px',
                  padding: '5px',
                }}>
                <option value='rect'>Rectangle</option>
                <option value='circle'>Circle</option>
                <option value='ellipse'>Ellipse</option>
                <option value='line'>Line</option>
              </select>
            </label>
          </HStack>
        </Center>

        <Popover onOpen={resetTypewriter} onClose={resetTypewriter}>
          <PopoverTrigger>
            <Button
              mt='30px'
              py='20px'
              px='60px'
              bg='none'
              borderRadius='15px'
              color='white'
              border='3px solid #03fcc2'
              _hover={{ bg: 'none' }}
              css={{
                animation: `${pulseAnimation} 3.5s ease-in-out infinite`,
              }}>
              Tell Me Where To Move!
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody color='black'>
              <Typewriter key={typewriterKey} typing={2}>
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

      <SvgShape
        shape={shape}
        width={width}
        height={height}
        color={color}
        position={position}
        startDrag={startDrag}
      />

      {/* {!isDragging && (
        <Tooltip label='You can drag me!' placement='top' hasArrow>
          <IconButton
            aria-label='Help'
            icon={<QuestionIcon />}
            size='sm'
            bg='none'
            color='white'
            position='absolute'
            left={iconPosition.left}
            top={iconPosition.top}
            zIndex='tooltip' // Ensures the tooltip is above other elements
            _hover={{
              bg: 'none',
            }}
          />
        </Tooltip>
      )} */}
    </Box>
  );
};

export default InteractiveSvg;
