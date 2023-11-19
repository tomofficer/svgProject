import { useState, useEffect, useCallback } from 'react';
import { Box, VStack } from '@chakra-ui/react';
import SvgShape from './SvgShape';

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

  return (
    <Box onMouseMove={onDrag} onMouseUp={stopDrag} onMouseLeave={stopDrag}>
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
          Shape:
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
