import React from 'react';

interface ContentProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
}

export const Content = ({ title, children, className }: ContentProps) => (
  <div>
    <h4 className={`text-3xl pb-2 ${className ? className : ''}`}>{title}</h4>
    {children}
  </div>
);
