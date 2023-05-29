import { Container } from '@mui/material';
import React from 'react';

import { Header } from './Header';

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => (
  <>
    <div className="container max-w-none mb-16">
      <div className="container max-w-none bg-neutral">
        <div className="container">
          <Header />
        </div>
      </div>
      {children}
    </div>
  </>
);

export const OneColumnWrapper = ({ children }: WrapperProps) => (
  <Wrapper>
    <div className="container mx-auto">{children}</div>
  </Wrapper>
);

export const MultiColumnWrapper = ({ children }: WrapperProps) => <Wrapper>{children}</Wrapper>;
