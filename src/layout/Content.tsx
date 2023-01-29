import { SxProps, Theme, Typography } from '@mui/material';
import { Box } from '@mui/material';
import React from 'react';

interface ContentProps {
  title: string;
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
}

export const Content = ({ title, children, sx }: ContentProps) => (
  <Box sx={sx}>
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
