import { Delete } from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  List,
  ListItem,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

import { Content } from '../layout/Content';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setPlayEncounter } from '../store/reducers/encounterPlayReducer';
import {
  addMonster,
  addPlayerCharacters,
  removeEntity,
  selectEncounter,
  setFinishedValue,
  setReadyValue,
  updateEncounterName,
} from '../store/reducers/encountersReducer';
import { Page, setPage } from '../store/reducers/globalReducer';
import { ReducerNames } from '../store/reducers/reducerNames';

export const EncounterEdit = () => {
  const encounterNameInputFieldRef = React.useRef<null | HTMLInputElement>(null);

  const monsterNameInputFieldRef = React.useRef<null | HTMLInputElement>(null);
  const monsterStartHealthInputFieldRef = React.useRef<null | HTMLInputElement>(null);
  const monsterCloneInputFieldRef = React.useRef<null | HTMLInputElement>(null);

  const { encounters, selectedEncounter } = useAppSelector((state) => state[ReducerNames.ENCOUNTERS]);
  const { characters } = useAppSelector((state) => state[ReducerNames.CHARACTERS]);
  const dispatch = useAppDispatch();

  const currentEncounter = encounters.find((encounter) => encounter.id === selectedEncounter);
  if (!currentEncounter) {
    dispatch(selectEncounter(null));
    dispatch(setPage(Page.ENCOUNTERS));

    // The fuck
    return <div></div>;
  }

  const { name, entities, finished, ready } = currentEncounter;

  const playerCharacters = entities.filter((entity) => entity.isPlayerCharacter);
  const monsters = entities.filter((entity) => !entity.isPlayerCharacter);

  const updateEncounterNameCallback = () => {
    if (encounterNameInputFieldRef?.current) {
      dispatch(updateEncounterName(encounterNameInputFieldRef.current.value));
    }
  };

  const startEncounterCallback = () => {
    if (currentEncounter) {
      dispatch(setReadyValue(true));
      dispatch(setPlayEncounter(currentEncounter));
      dispatch(setPage(Page.ENCOUNTER_PLAY));
    }
  };

  const addMonsterCallback = () => {
    if (
      monsterNameInputFieldRef?.current &&
      monsterStartHealthInputFieldRef?.current &&
      monsterCloneInputFieldRef?.current
    ) {
      dispatch(
        addMonster({
          name: monsterNameInputFieldRef.current.value,
          startHealth: monsterStartHealthInputFieldRef.current.value,
          clones: parseInt(monsterCloneInputFieldRef.current.value),
        }),
      );

      monsterNameInputFieldRef.current.value = '';
      monsterStartHealthInputFieldRef.current.value = '';
      monsterCloneInputFieldRef.current.value = '1';
    }
  };

  return (
    <>
      <Content title={`Encounter: ${name}`}>
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
              label="Encounter name"
              defaultValue={name}
              size="small"
              InputLabelProps={{ shrink: true }}
              sx={{
                minWidth: '15rem',
                m: 1,
                ml: 0,
              }}
              inputRef={encounterNameInputFieldRef}
              onKeyUp={(event) => {
                if (event.key.toLowerCase() === 'enter') {
                  updateEncounterNameCallback();
                }
              }}
            />
            <Divider orientation="vertical" flexItem />
            <Button
              variant="contained"
              onClick={updateEncounterNameCallback}
              sx={{
                m: 1,
                alignSelf: 'center',
              }}
            >
              Update name
            </Button>
            <Divider orientation="vertical" flexItem />
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={ready}
                    sx={{
                      m: 1,
                    }}
                    onChange={(event) => {
                      dispatch(setReadyValue(event.target.checked));
                    }}
                  />
                }
                label="Ready"
              />
            </FormGroup>
            <Divider orientation="vertical" flexItem />
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={finished}
                    sx={{
                      m: 1,
                    }}
                    onChange={(event) => {
                      dispatch(setFinishedValue(event.target.checked));
                    }}
                  />
                }
                label="Finished"
              />
            </FormGroup>
            <Button
              variant="contained"
              onClick={startEncounterCallback}
              sx={{
                m: 1,
                ml: 'auto',
              }}
            >
              Start
            </Button>
          </Stack>
        </Box>
      </Content>
      <Content title={`Monsters (${monsters.length})`}>
        <Box
          sx={{
            backgroundColor: '#fff',
            p: 1,
            pb: 0,
            pt: 0,
          }}
        >
          <Box>
            {monsters.length === 0 ? (
              <Typography variant="body1">No monsters added.</Typography>
            ) : (
              <List sx={{ p: 0 }}>
                {monsters.map((monster) => (
                  <ListItem
                    sx={{ pl: 0 }}
                    key={monster.id}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => {
                          dispatch(removeEntity(monster.id));
                        }}
                      >
                        <Delete />
                      </IconButton>
                    }
                  >
                    {`${monster.name} (${monster.startHealth} HP)`}
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
          <Divider />
          <Box>
            <Stack direction="row" alignItems="center">
              <TextField
                label="Monster name"
                size="small"
                sx={{ m: 1, ml: 0 }}
                inputRef={monsterNameInputFieldRef}
                InputLabelProps={{ shrink: true }}
              />
              <Divider orientation="vertical" flexItem />
              <TextField
                label="Monster start health"
                size="small"
                sx={{ m: 1 }}
                inputRef={monsterStartHealthInputFieldRef}
                InputLabelProps={{ shrink: true }}
              />
              <Divider orientation="vertical" flexItem />
              <TextField
                label="Clone number"
                defaultValue={1}
                size="small"
                sx={{ m: 1 }}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                inputRef={monsterCloneInputFieldRef}
                InputLabelProps={{ shrink: true }}
              />
              <Divider orientation="vertical" flexItem />
              <Button variant="contained" onClick={addMonsterCallback} sx={{ m: 1 }}>
                Add monster
              </Button>
            </Stack>
          </Box>
        </Box>
      </Content>
      <Content title={`Player characters (${playerCharacters.length})`}>
        <Box
          sx={{
            backgroundColor: '#fff',
            p: 1,
            pb: 0,
            pt: 0,
          }}
        >
          <Box>
            {playerCharacters.length === 0 ? (
              <Typography variant="body1">No player characters added.</Typography>
            ) : (
              <List sx={{ p: 0 }}>
                {playerCharacters.map((playerCharacter) => (
                  <ListItem
                    sx={{ pl: 0 }}
                    key={playerCharacter.id}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => {
                          dispatch(removeEntity(playerCharacter.id));
                        }}
                      >
                        <Delete />
                      </IconButton>
                    }
                  >
                    {playerCharacter.name}
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
          <Divider />
          <Box
            sx={{
              mt: 1,
              pb: 1,
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                if (selectedEncounter) {
                  dispatch(
                    addPlayerCharacters({
                      encounter: selectedEncounter,
                      players: characters,
                    }),
                  );
                }
              }}
            >
              Add player characters
            </Button>
          </Box>
        </Box>
      </Content>
    </>
  );
};
