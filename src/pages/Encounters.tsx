import { Delete, PlayCircle } from '@mui/icons-material';
import { Box, Button,IconButton, List, ListItem, TextField, Typography } from '@mui/material';
import React from 'react';

import { Content } from '../layout/Content';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setPlayEncounter } from '../store/reducers/encounterPlayReducer';
import { addEncounter, removeEncounter, selectEncounter } from '../store/reducers/encountersReducer';
import { Page, setPage } from '../store/reducers/globalReducer';
import { ReducerNames } from '../store/reducers/reducerNames';

export const Encounters = () => {
  const { encounters } = useAppSelector((state) => state[ReducerNames.ENCOUNTERS]);
  const dispatch = useAppDispatch();

  const inputFieldRef = React.useRef<null | HTMLInputElement>(null);

  const addEncounterCallback = () => {
    if (inputFieldRef?.current) {
      dispatch(addEncounter(inputFieldRef.current.value));
      inputFieldRef.current.value = '';
    }
  };

  const sortedEncounters = encounters.slice().sort((a, b) => {
    if (a.finished) {
      return 1;
    }
    if (b.finished) {
      return -1;
    }

    if (a.ready) {
      return -1;
    }
    if (b.ready) {
      return 1;
    }

    return 0;
  });

  return (
    <Content title="Encounters">
      <Box
        sx={{
          backgroundColor: '#fff',
          mt: 1,
          p: 1,
        }}
      >
        {sortedEncounters.length === 0 ? (
          <Typography variant="body1">No encounters added.</Typography>
        ) : (
          <List>
            {sortedEncounters.map((encounter) => (
              <ListItem
                key={encounter.id}
                sx={{ pb: 0 }}
                secondaryAction={
                  <>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => {
                        dispatch(removeEncounter(encounter.id));
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </>
                }
              >
                <IconButton
                  edge="start"
                  aria-label="play"
                  sx={{
                    color: encounter.ready ? 'green' : 'gray',
                  }}
                  onClick={() => {
                    if (encounter.ready) {
                      dispatch(setPlayEncounter(encounter));
                      dispatch(setPage(Page.ENCOUNTER_PLAY));
                    }
                  }}
                >
                  <PlayCircle />
                </IconButton>
                <span
                  onClick={() => {
                    dispatch(selectEncounter(encounter.id));
                    dispatch(setPage(Page.ENCOUNTER_EDIT));
                  }}
                  style={{
                    cursor: 'pointer',
                    textDecoration: encounter.finished ? 'line-through' : 'initial',
                  }}
                >
                  {`${encounter.name} (${
                    encounter.entities.filter((entity) => entity.isPlayerCharacter).length
                  } players, ${encounter.entities.filter((entity) => !entity.isPlayerCharacter).length} monsters)`}
                </span>
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
            label="Encounter name"
            variant="standard"
            inputRef={inputFieldRef}
            onKeyUp={(event) => {
              if (event.key.toLowerCase() === 'enter') {
                addEncounterCallback();
              }
            }}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" onClick={addEncounterCallback}>
            Add encounter
          </Button>
        </Box>
      </Box>
    </Content>
  );
};
