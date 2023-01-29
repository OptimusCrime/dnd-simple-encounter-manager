import React from 'react';

interface EffectsProgressbarProps {
  current: number;
  max: number;
}

export const EffectsProgressbar = ({ current, max }: EffectsProgressbarProps) => {
  const boxes = Array.from(Array(max)).map((_value, index) => (index < current ? 1 : 0));
  const boxSize = 100 / max;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '1rem',
      }}
    >
      {boxes.map((box, index) => (
        <div
          key={index}
          style={{
            width: `${boxSize}%`,
            height: '20px',
            display: 'block',
            borderTop: '1px solid rgb(231, 235, 240)',
            borderBottom: '1px solid rgb(231, 235, 240)',
            borderLeft: index === 0 ? '1px solid rgb(231, 235, 240)' : 'none',
            borderRight: '1px solid rgb(231, 235, 240)',
            backgroundColor: box === 0 ? 'transparent' : '#4caf50',
          }}
        ></div>
      ))}
    </div>
  );
};
