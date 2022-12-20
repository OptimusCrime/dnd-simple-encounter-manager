import React from 'react';

import { Delete } from '@mui/icons-material';
import { Box, ListItem, List, Typography, IconButton, TextField, Button } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addCharacter, removeCharacter } from '../store/reducers/charactersReducer';
import { ReducerNames } from '../store/reducers/reducerNames';
import { Content } from '../layout/Content';

export const Characters = () => {
  const { characters } = useAppSelector((state) => state[ReducerNames.CHARACTERS]);
  const dispatch = useAppDispatch();

  const inputFieldRef = React.useRef<undefined | any>(null);

  const addCharacterCallback = () => {
    dispatch(addCharacter(inputFieldRef.current.value));
    inputFieldRef.current.value = '';
  };

  return (
    <Content title="Characters">
      <>
        <Box
          sx={{
            backgroundColor: '#fff',
            mt: 1,
            p: 1,
          }}
        >
          {characters.length === 0 ? (
            <Typography variant="body1">No characters added.</Typography>
          ) : (
            <List>
              {characters.map((character) => (
                <ListItem
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
        <Box
          sx={{
            mt: 2,
            backgroundColor: '#fff',
            p: 1,
          }}
        >
          <Box>
            <TextField
              label="Character name"
              variant="standard"
              inputRef={inputFieldRef}
              onKeyUp={(event) => {
                if (event.key.toLowerCase() === 'enter') {
                  addCharacterCallback();
                }
              }}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" onClick={addCharacterCallback}>
              Add character
            </Button>
          </Box>
        </Box>
      </>
    </Content>
  );
};
