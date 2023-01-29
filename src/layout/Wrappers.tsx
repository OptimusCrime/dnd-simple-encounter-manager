import { Container } from '@mui/material';
import React from 'react';

import { Header } from './Header';

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => (
  <div className="App">
    <Header />
    {children}
  </div>
);

export const OneColumnWrapper = ({ children }: WrapperProps) => (
  <Wrapper>
    <Container
      sx={{
        mt: 2,
        pb: 25,
      }}
    >
      {children}
    </Container>
  </Wrapper>
);

export const MultiColumnWrapper = ({ children }: WrapperProps) => <Wrapper>{children}</Wrapper>;
