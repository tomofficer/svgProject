const SvgShape = ({ shape, width, height, color, position, startDrag }) => {
  const renderShape = () => {
    switch (shape) {
      case 'rect':
        return <rect width={width} height={height} fill={color} />;
      case 'circle':
        const radius = Math.min(width, height) / 2;
        return <circle cx={radius} cy={radius} r={radius} fill={color} />;
      case 'ellipse':
        return (
          <ellipse
            cx={width / 2}
            cy={height / 2}
            rx={width / 2}
            ry={height / 2}
            fill={color}
          />
        );
      case 'line':
        return (
          <line
            x1='0'
            y1='0'
            x2={width}
            y2={height}
            stroke={color}
            strokeWidth='2'
          />
        );
      default:
        return null;
    }
  };

  return (
    <svg
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        cursor: 'move',
      }}
      onMouseDown={startDrag}
      width={width}
      height={height}>
      {renderShape()}
    </svg>
  );
};

export default SvgShape;
