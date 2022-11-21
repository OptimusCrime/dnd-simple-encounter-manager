import React from "react";

import {
  Box,
  Button, Divider, FormControlLabel, FormGroup,
  IconButton,
  List,
  ListItem,
  Stack, Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {ReducerNames} from "../store/reducers/reducerNames";
import {
  addPlayerCharacters,
  removeEntity,
  selectEncounter,
  updateEncounterName,
  setFinishedValue,
  setReadyValue, addMonster
} from "../store/reducers/encountersReducer";
import {Content} from "../layout/Content";
import {Page, setPage} from "../store/reducers/globalReducer";

export const EncounterEdit = () => {
  const encounterNameInputFieldRef = React.useRef<undefined | any>(null);

  const monsterNameInputFieldRef = React.useRef<undefined | any>(null);
  const monsterStartHealthInputFieldRef = React.useRef<undefined | any>(null);
  const monsterCloneInputFieldRef = React.useRef<undefined | any>(null);

  const {encounters, selectedEncounter} = useAppSelector(state => state[ReducerNames.ENCOUNTERS]);
  const {characters} = useAppSelector(state => state[ReducerNames.CHARACTERS]);
  const dispatch = useAppDispatch();

  const currentEncounter = encounters.find(encounter => encounter.id === selectedEncounter);
  if (!currentEncounter) {
    dispatch(selectEncounter(null));
    dispatch(setPage(Page.ENCOUNTERS));

    // The fuck
    return <div></div>;
  }

  const {name, entities, finished, ready} = currentEncounter;

  const playerCharacters = entities.filter(entity => entity.isPlayerCharacter);
  const monsters = entities.filter(entity => !entity.isPlayerCharacter);

  const updateEncounterNameCallback = () => {
    dispatch(updateEncounterName(encounterNameInputFieldRef.current.value));
  };

  const addMonsterCallback = () => {
    dispatch(addMonster({
      name: monsterNameInputFieldRef.current.value,
      startHealth: parseInt(monsterStartHealthInputFieldRef.current.value) || 0,
      clones: parseInt(monsterCloneInputFieldRef.current.value)
    }));

    monsterNameInputFieldRef.current.value = "";
    monsterStartHealthInputFieldRef.current.value = "";
    monsterCloneInputFieldRef.current.value = "1";
  };

  return (
    <>
      <Content title={`Encounter: ${name}`}>
        <Box
          sx={{
            backgroundColor: '#fff',
            mt: 1,
            p: 1,
            pt: 2,
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <TextField
              label="Encounter name"
              defaultValue={name}
              variant="standard"
              sx={{
                minWidth: '15rem'
              }}
              inputRef={encounterNameInputFieldRef}
              onKeyUp={event => {
                if (event.key.toLowerCase() === "enter") {
                  updateEncounterNameCallback();
                }
              }}
            />
            <Divider orientation="vertical" flexItem/>
            <Button
              variant="contained"
              onClick={updateEncounterNameCallback}
              sx={{
                alignSelf: 'center'
              }}
            >
              Update name
            </Button>
            <Divider orientation="vertical" flexItem/>
            <FormGroup>
              <FormControlLabel control={
                <Switch
                  checked={ready}
                  onChange={(event) => {
                    dispatch(setReadyValue(event.target.checked));
                  }}
                />
              } label="Ready"/>
            </FormGroup>
            <Divider orientation="vertical" flexItem/>
            <FormGroup>
              <FormControlLabel control={
                <Switch
                  checked={finished}
                  onChange={(event) => {
                    dispatch(setReadyValue(event.target.checked));
                  }}
                />
              } label="Finished"/>
            </FormGroup>
          </Stack>
        </Box>
      </Content>
      <Content title={`Player characters (${playerCharacters.length})`}>
        <Box
          sx={{
            backgroundColor: '#fff',
            mt: 1,
            p: 1,
            pt: 2,
          }}
        >
          <Box>
            {playerCharacters.length === 0 ? (
              <Typography variant="body1">No player characters added.</Typography>
            ) : (
              <List>
                {playerCharacters.map(playerCharacter => (
                  <ListItem
                    key={playerCharacter.id}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => {
                          dispatch(removeEntity(playerCharacter.id))
                        }}
                      >
                        <Delete/>
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
          <Box sx={{mt: 2}}>
            <Button
              variant="contained"
              onClick={() => dispatch(addPlayerCharacters(characters))}
            >
              Add player characters
            </Button>
          </Box>
        </Box>
        <Content title={`Monsters (${monsters.length})`}>
          <Box
            sx={{
              backgroundColor: '#fff',
              mt: 1,
              p: 1,
              pt: 2,
            }}
          >
            <Box>
              {monsters.length === 0 ? (
                <Typography variant="body1">No monsters added.</Typography>
              ) : (
                <List>
                  {monsters.map(monster => (
                    <ListItem
                      key={monster.id}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => {
                            dispatch(removeEntity(monster.id))
                          }}
                        >
                          <Delete/>
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
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={1}
            >
              <TextField
                label="Monster name"
                variant="standard"
                inputRef={monsterNameInputFieldRef}
              />
              <Divider orientation="vertical" flexItem/>
              <TextField
                label="Monster start health"
                variant="standard"
                inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                inputRef={monsterStartHealthInputFieldRef}
              />
              <Divider orientation="vertical" flexItem/>
              <TextField
                label="Clone number"
                defaultValue={1}
                variant="standard"
                inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                inputRef={monsterCloneInputFieldRef}
              />
              <Divider orientation="vertical" flexItem/>
              <Button
                variant="contained"
                onClick={addMonsterCallback}
              >
                Add monster
              </Button>
            </Stack>
          </Box>
        </Content>
      </Content>
    </>
  );
}
