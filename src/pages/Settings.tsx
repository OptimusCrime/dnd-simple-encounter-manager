import { Box, Button } from '@mui/material';
import React from 'react';

import { Content } from '../layout/Content';

export const Settings = () => {
  return (
    <Content title="Settings">
      <>
        <Box
          sx={{
            backgroundColor: '#fff',
            mt: 1,
            p: 1,
          }}
        >
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" onClick={() => {}}>
              Button 1
            </Button>
          </Box>
        </Box>
      </>
    </Content>
  );
};
