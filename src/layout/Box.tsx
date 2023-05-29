import React from 'react';

interface BoxProps {
  children: React.ReactNode;
  className?: string;
}

export const Box = ({ children, className }: BoxProps) => (
  <div className={`container bg-white p-4 rounded-lg ${className ? className : ''}`}>{children}</div>
);
