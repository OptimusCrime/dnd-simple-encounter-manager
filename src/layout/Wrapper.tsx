import React from 'react';

import { Header } from './Header';

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => (
  <div className="container max-w-none mb-16">
    <div className="container max-w-none bg-neutral">
      <div className="container">
        <Header />
      </div>
    </div>
    <div className="container mx-auto">{children}</div>
  </div>
);
