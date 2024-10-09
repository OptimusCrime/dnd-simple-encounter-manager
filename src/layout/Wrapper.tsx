import React from 'react';

import { Footer } from './Footer';
import { Header } from './Header';

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => (
  <div className="container max-w-none">
    <Header />

    <div className="container mx-auto">{children}</div>

    <Footer />
  </div>
);
