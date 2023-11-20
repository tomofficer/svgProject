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
import logo from '../src/imgAssets/lectralogoblack.png';
import SvgShape from './SvgShape';
import Typewriter from 'react-typewriter';

//Pulse Animation Keyframes
const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const shapes = ['rect', 'circle', 'ellipse', 'line']; // Add more shapes as needed

const AltUI = () => {
  //State Variables
  const [width, setWidth] = useState(100); // Default width
  const [height, setHeight] = useState(100); // Default height
  const [position, setPosition] = useState({ x: 200, y: 200 }); // Default position
  const [color, setColor] = useState('#0275ff'); //Default color
  const [isDragging, setIsDragging] = useState(false); //Drag state
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 }); //Default drag
  const [shape, setShape] = useState('rect'); // Default shape
  const [showHelpIcon, setShowHelpIcon] = useState(false); //Tooltip timeout
  const [hasDragged, setHasDragged] = useState(false); //Tooltip dissapear after drag
  const [isPopoverOpen, setIsPopoverOpen] = useState(false); //Popover open tracking

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
    }, 5000); // 5 seconds

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
    handleDrag();
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

  const handleDrag = () => {
    setHasDragged(true);
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
    'move left',
    'move right',
    'move up',
    'move down',
    'change shape',
  ];

  //Text Command Handler
  const handleMovementOption = (option) => {
    switch (option) {
      case 'move left':
        moveLeft();
        break;
      case 'move right':
        moveRight();
        break;
      case 'move up':
        moveUp();
        break;
      case 'move down':
        moveDown();
        break;
      default:
        break;
    }
  };

  //Popover Management Handlers
  const handlePopoverOpen = () => {
    setIsPopoverOpen(true);
    resetTypewriter();
  };

  const handlePopoverClose = () => {
    setIsPopoverOpen(false);
    resetTypewriter();
  };

  //Random color generator for color command
  const generateRandomColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
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
    //Ignore case sensitivity for better UX
    const formattedInput = inputValue.toLowerCase();

    if (formattedInput === 'change shape') {
      setShape((currentShape) => {
        const currentShapeIndex = shapes.indexOf(currentShape.toLowerCase());
        const nextShapeIndex = (currentShapeIndex + 1) % shapes.length;
        return shapes[nextShapeIndex];
      });
      setInputValue('');
    } else if (formattedInput === 'change color') {
      const newColor = generateRandomColor();
      setColor(newColor); // Assuming setColor is your state setter for the color
      setInputValue('');
    } else if (movementOptions.includes(formattedInput)) {
      handleMovementOption(formattedInput); // Use formattedInput here
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

  // Calculate the position of the "?" icon for tooltip
  const iconPosition = {
    left: position.x + width - 10, // Adjust based on the current width of the SVG
    top: position.y - 10, // Adjust based on the current position of the SVG
  };

  return (
    <Box
      onMouseMove={onDrag}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      fontFamily='Poppins'
      fontSize='16px'
      fontWeight='500'
      bg='white'
      color='black'>
      <VStack
        backdropFilter='blur(10px)'
        align='center'
        spacing='20px'
        shadow={'2xl'}
        px='50px'
        py='50px'
        borderRadius='40px'>
        <Image src={logo} maxW='200px' />
        <HStack mb='20px'>
          <Button
            onClick={moveLeft}
            bg='black'
            borderRadius='15px'
            color='white'
            _hover={{ transform: 'scale(0.97)', bg: '#0275ff' }}>
            Move Left
          </Button>
          <Button
            onClick={moveRight}
            bg='black'
            borderRadius='15px'
            color='white'
            _hover={{ transform: 'scale(0.97)', bg: '#0275ff' }}>
            Move Right
          </Button>
          <Button
            onClick={moveUp}
            bg='black'
            borderRadius='15px'
            color='white'
            _hover={{ transform: 'scale(0.97)', bg: '#0275ff' }}>
            Move Up
          </Button>
          <Button
            onClick={moveDown}
            bg='black'
            borderRadius='15px'
            color='white'
            _hover={{ transform: 'scale(0.97)', bg: '#0275ff' }}>
            Move Down
          </Button>
        </HStack>

        <Center>
          <HStack spacing='30px'>
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

        <HStack spacing='40px' mt='5px'>
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
                border: '2px solid black',
                borderRadius: '15px',
                width: '100px',
                padding: '5px',
              }}
            />
          </label>
        </HStack>

        <Center>
          <HStack spacing='40px' mt='10px'>
            <label>
              <span style={{ marginRight: '10px' }}>Shape:</span>
              <select
                value={shape}
                onChange={(e) => setShape(e.target.value)}
                style={{
                  background: 'none',
                  border: '2px solid black',
                  borderRadius: '15px',
                  padding: '5px',
                }}>
                <option value='rect'>Rectangle</option>
                <option value='circle'>Circle</option>
                <option value='ellipse'>Ellipse</option>
                <option value='line'>Line</option>
              </select>
            </label>
            <label>
              <span style={{ marginRight: '10px' }}>Color:</span>
              <input
                type='color'
                value={color}
                onChange={handleColorChange}
                style={{
                  background: 'none',
                  border: '2px solid black',
                  borderRadius: '15px',
                  width: '100px',
                  height: '43px',
                  padding: '7px',
                }}
              />
            </label>
          </HStack>
        </Center>

        <Popover
          onOpen={handlePopoverOpen}
          onClose={handlePopoverClose}
          placement='top'>
          <PopoverTrigger>
            <Button
              mt='20px'
              py='20px'
              px='60px'
              bg={isPopoverOpen ? '#0275ff' : 'black'}
              borderRadius='15px'
              color='white'
              _hover={{ bg: '#0275ff' }}
              css={{
                animation: `${pulseAnimation} 3.5s ease-in-out infinite`,
              }}>
              Tell Me What To Do!
            </Button>
          </PopoverTrigger>
          <PopoverContent shadow='2xl' mb='10px' pt='20px'>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody color='black' textAlign='center'>
              <Typewriter key={typewriterKey} typing={2} fontSize='12px'>
                {
                  'Tell me what to do - you can say something like: Move up, move left, change shape, change color, etc'
                }
              </Typewriter>
              <Input
                border='2px solid black'
                placeholder='Start typing...'
                mt='10px'
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

      {showHelpIcon && !hasDragged && (
        <Tooltip label='Try dragging me!' placement='top' hasArrow>
          <IconButton
            aria-label='Help'
            icon={<QuestionIcon />}
            size='lg'
            bg='none'
            color='black'
            position='absolute'
            left={iconPosition.left}
            top={iconPosition.top}
            zIndex='tooltip'
            _hover={{ bg: 'none' }}
            onMouseDown={handleDrag}
          />
        </Tooltip>
      )}
    </Box>
  );
};

export default AltUI;
