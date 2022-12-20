import { Box, Button, Divider, Stack } from '@mui/material';
import React from 'react';

import { Content } from '../layout/Content';
import { ReducerNames } from '../store/reducers/reducerNames';
import { deleteKey } from '../utilities/localStorage';
import { unreachableCode } from '../utilities/unreachableCode';

enum CacheDeleteTarget {
  ENCOUNTERS,
  CHARACTERS,
  ALL,
}

export const Settings = () => {
  const deleteCache = (target: CacheDeleteTarget) => {
    switch (target) {
      case CacheDeleteTarget.CHARACTERS:
        deleteKey(ReducerNames.CHARACTERS);
        break;
      case CacheDeleteTarget.ENCOUNTERS:
        deleteKey(ReducerNames.ENCOUNTERS);
        break;
      case CacheDeleteTarget.ALL:
        deleteKey(ReducerNames.GLOBAL);
        deleteKey(ReducerNames.CHARACTERS);
        deleteKey(ReducerNames.ENCOUNTERS);
        deleteKey(ReducerNames.ENCOUNTER_PLAY);
        break;
      default:
        unreachableCode(target);
    }

    // Derp, let us also reload the page
    window.location.reload();
  };

  return (
    <Content title="Clear local cache">
      <Box
        sx={{
          backgroundColor: '#fff',
          p: 1,
          pb: 0,
          pt: 0,
        }}
      >
        <Stack direction="row" alignItems="center">
          <Button variant="contained" onClick={() => deleteCache(CacheDeleteTarget.ENCOUNTERS)} sx={{ m: 1, ml: 0 }}>
            Delete encounters
          </Button>
          <Divider orientation="vertical" flexItem />
          <Button variant="contained" onClick={() => deleteCache(CacheDeleteTarget.CHARACTERS)} sx={{ m: 1 }}>
            Delete characters
          </Button>
          <Divider orientation="vertical" flexItem />
          <Button variant="contained" onClick={() => deleteCache(CacheDeleteTarget.ALL)} sx={{ m: 1 }}>
            Delete all
          </Button>
        </Stack>
      </Box>
    </Content>
  );
};
