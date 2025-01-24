import React from 'react';

import { Footer } from './Footer';
import { Header } from './Header';

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => (
  <div className="container max-w-none">
    <div className="min-h-[calc(100vh-84px)]">
      <Header />
      <div className="container mx-auto">{children}</div>
    </div>
    <Footer />
  </div>
);
