import React from 'react';

import { Typography } from '@mui/material';
import { Box } from '@mui/material';

export const Content = ({ title, children} : {title: string, children: JSX.Element | JSX.Element[]}): JSX.Element => {
  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          mt: 2,
        }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
}
