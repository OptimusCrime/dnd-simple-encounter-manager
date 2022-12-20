import { Delete } from '@mui/icons-material';
import { Box, Button, Divider, IconButton, List, ListItem, Stack, TextField, Typography } from '@mui/material';
import React from 'react';

import { Content } from '../layout/Content';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addCharacter, removeCharacter } from '../store/reducers/charactersReducer';
import { ReducerNames } from '../store/reducers/reducerNames';

export const Characters = () => {
  const { characters } = useAppSelector((state) => state[ReducerNames.CHARACTERS]);
  const dispatch = useAppDispatch();

  const inputFieldRef = React.useRef<null | HTMLInputElement>(null);

  const addCharacterCallback = () => {
    if (inputFieldRef?.current && inputFieldRef.current?.value.length > 0) {
      dispatch(addCharacter(inputFieldRef.current.value));
      inputFieldRef.current.value = '';
    }
  };

  return (
    <>
      <Content title="Characters">
        <Box
          sx={{
            backgroundColor: '#fff',
            p: 1,
            pb: 0,
            pt: 0,
          }}
        >
          {characters.length === 0 ? (
            <Typography variant="body1">No characters added.</Typography>
          ) : (
            <List sx={{ p: 0 }}>
              {characters.map((character) => (
                <ListItem
                  sx={{ pl: 0, pr: 0 }}
                  key={character}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => {
                        dispatch(removeCharacter(character));
                      }}
                    >
                      <Delete />
                    </IconButton>
                  }
                >
                  {character}
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Content>
      <Content title="Add character">
        <Box
          sx={{
            backgroundColor: '#fff',
            p: 1,
            pb: 0,
            pt: 0,
          }}
        >
          <Stack direction="row" alignItems="center">
            <TextField
              label="Character name"
              size="small"
              sx={{ m: 1, ml: 0 }}
              inputRef={inputFieldRef}
              onKeyUp={(event) => {
                if (event.key.toLowerCase() === 'enter') {
                  addCharacterCallback();
                }
              }}
              InputLabelProps={{ shrink: true }}
            />
            <Divider orientation="vertical" flexItem />
            <Button variant="contained" onClick={addCharacterCallback} sx={{ m: 1 }}>
              Add character
            </Button>
          </Stack>
        </Box>
      </Content>
    </>
  );
};
