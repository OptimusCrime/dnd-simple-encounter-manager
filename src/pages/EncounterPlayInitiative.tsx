import {ArrowDownward, ArrowUpward} from '@mui/icons-material';
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
} from '@mui/material';
import React, {useState} from 'react';

import {Content} from '../layout/Content';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {beginEncounter} from '../store/reducers/encounterPlayReducer';
import {Encounter, Entity} from '../store/reducers/encountersReducer';
import {InitiativeEntityState} from './EncounterPlay.types';
import {ReducerNames} from "../store/reducers/reducerNames";
import {Page, setPage} from "../store/reducers/globalReducer";

enum MoveDirection {
  UP,
  DOWN,
}

const mapEntityToInitiativeState = (entity: Entity, index: number): InitiativeEntityState => {
  const {id, name, startHealth, isPlayerCharacter} = entity;

  return {
    id,
    name,
    order: index,
    startHealth,
    initialDamageTaken: 0,
    isPlayerCharacter,
    isSurprised: false,
    inPlay: true,
    initiative: null,
  };
};

const mapEncounterToInitiativeState = (encounter: Encounter): InitiativeEntityState[] => {
  // Let's always put the players on top
  const {entities} = encounter;

  const entitiesWithPlayersFirst = [
    ...entities.filter((entity) => entity.isPlayerCharacter),
    ...entities.filter((entity) => !entity.isPlayerCharacter),
  ];

  return [...entitiesWithPlayersFirst.map((entity, index) => mapEntityToInitiativeState(entity, index))];
};

export const EncounterPlayPhaseInitiative = () => {
  const dispatch = useAppDispatch();

  const {phase, encounter} = useAppSelector((state) => state[ReducerNames.ENCOUNTER_PLAY]);

  if (encounter === null) {
    return dispatch(setPage(Page.ENCOUNTERS))
  }

  const [state, setState] = useState<InitiativeEntityState[]>(mapEncounterToInitiativeState(encounter));

  const {name} = encounter;

  const updateState = (id: number, data: Partial<InitiativeEntityState>) => {
    setState((prevState) => {
      return prevState.map((prevEntityState) => {
        if (prevEntityState.id !== id) {
          return prevEntityState;
        }

        return {
          ...prevEntityState,
          ...data,
        };
      });
    });
  };

  const moveEntityUpOrDown = (id: number, direction: MoveDirection) => {
    const currentOrderValue = state.find((entity) => entity.id === id)?.order;
    // Stupid null check derp
    if (typeof currentOrderValue === 'undefined') {
      return;
    }

    const neighbourOrderValue = direction === MoveDirection.UP ? currentOrderValue - 1 : currentOrderValue + 1;
    const neighbourEntity = state.find((entity) => entity.order === neighbourOrderValue);
    if (!neighbourEntity) {
      return;
    }

    // Simply swap the values
    updateState(id, {
      order: neighbourOrderValue,
    });
    updateState(neighbourEntity.id, {
      order: currentOrderValue,
    });
  };

  const numberOfEntities = state.length;

  const sortedState = state.slice().sort((a, b) => a.order - b.order);

  const sortBasedOnInitiativeValuesCallback = () => {
    const sortedStateBasedOnInitiative = state.slice().sort((a, b) => {
      if (a.initiative === null && b.initiative === null) {
        if (a.inPlay && !b.inPlay) {
          return -1;
        }

        if (!a.inPlay && b.inPlay) {
          return 1;
        }

        return 0;
      }

      if (a.initiative && b.initiative === null) {
        return -1;
      }

      if (a.initiative === null && b.initiative) {
        return 1;
      }

      // Stupid TypeScript
      return (b.initiative as number) - (a.initiative as number);
    });

    sortedStateBasedOnInitiative.forEach((entity, index) => {
      updateState(entity.id, {
        order: index,
      });
    });
  };

  const startEncounterCallback = () => {
    dispatch(beginEncounter(state));
  };

  const entitiesNum = sortedState.length;

  return (
    <>
      <Content title={`Decide initiative: ${name}`}>
        <Box
          sx={{
            backgroundColor: '#fff',
            p: 1,
            pb: 0,
            pt: 0,
          }}
        >
          <Box>
            <List sx={{pb: 1}}>
              {sortedState.map((entity, idx) => (
                <ListItem
                  key={entity.id}
                  sx={{
                    backgroundColor: '#eee',
                    mb: idx + 1 === entitiesNum ? 0 : 1,
                    width: '100%',
                    borderRadius: '4px 4px',
                    p: 1,
                  }}
                  secondaryAction={
                    <>
                      {entity.order + 1 !== numberOfEntities && (
                        <IconButton
                          edge="end"
                          tabIndex={-1}
                          onClick={() => moveEntityUpOrDown(entity.id, MoveDirection.DOWN)}
                        >
                          <ArrowDownward/>
                        </IconButton>
                      )}
                      {entity.order > 0 && (
                        <IconButton
                          edge="end"
                          tabIndex={-1}
                          onClick={() => moveEntityUpOrDown(entity.id, MoveDirection.UP)}
                        >
                          <ArrowUpward/>
                        </IconButton>
                      )}
                    </>
                  }
                >
                  <Stack direction="column" alignItems="flex-end" justifyContent="space-between">
                    <Stack direction="row" alignItems="left">
                      <Stack
                        direction="column"
                        alignItems="flex-start"
                        justifyContent="space-between"
                        sx={{
                          alignSelf: 'center',
                          minWidth: '15rem',
                          mr: 1,
                        }}
                      >
                        {`${entity.name} ${entity.isPlayerCharacter ? '' : `(${entity.startHealth} HP)`}`}
                      </Stack>

                      <Divider orientation="vertical" flexItem/>

                      <TextField
                        label="Initiative"
                        defaultValue=""
                        inputProps={{tabIndex: entity.order + 100}}
                        InputLabelProps={{shrink: true}}
                        size="small"
                        sx={{ mr: 1, ml: 1}}
                        onChange={(event) => {
                          const value = event.target.value;
                          if (/^[0-9]+$/.test(value)) {
                            updateState(entity.id, {
                              initiative: parseInt(value),
                            });
                          } else {
                            updateState(entity.id, {
                              initiative: null,
                            });
                          }
                        }}
                      />

                      {!entity.isPlayerCharacter && (
                        <>
                          <Divider orientation="vertical" flexItem/>
                          <TextField
                            label="Initial damage"
                            defaultValue=""
                            inputProps={{tabIndex: -1}}
                            InputLabelProps={{shrink: true}}
                            size="small"
                            sx={{ mr: 1, ml: 1}}
                            onChange={(event) => {
                              const value = event.target.value;
                              if (/^[0-9]+$/.test(value)) {
                                updateState(entity.id, {
                                  initialDamageTaken: parseInt(value),
                                });
                              }
                            }}
                          />
                        </>
                      )}

                      <Divider orientation="vertical" flexItem/>

                      <Stack
                        direction="column"
                        alignItems="flex-start"
                        justifyContent="space-between"
                        sx={{alignSelf: 'center'}}
                      >
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Switch
                                tabIndex={-1}
                                sx={{ mr: 1, ml: 1}}
                                checked={entity.isSurprised}
                                onChange={(event) => {
                                  updateState(entity.id, {
                                    isSurprised: event.target.checked,
                                  });
                                }}
                              />
                            }
                            label="Surprised"
                          />
                        </FormGroup>
                      </Stack>

                      <Divider orientation="vertical" flexItem/>

                      <Stack
                        direction="column"
                        alignItems="flex-start"
                        justifyContent="space-between"
                        sx={{alignSelf: 'center'}}
                      >
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Switch
                                tabIndex={-1}
                                sx={{ mr: 1, ml: 1}}
                                checked={entity.inPlay}
                                onChange={(event) => {
                                  updateState(entity.id, {
                                    inPlay: event.target.checked,
                                  });
                                }}
                              />
                            }
                            label="In play"
                          />
                        </FormGroup>
                      </Stack>
                    </Stack>
                  </Stack>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
        <Box
          sx={{
            mt: 1,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button variant="contained" onClick={sortBasedOnInitiativeValuesCallback}>
            Update sort
          </Button>

          <Button variant="contained" onClick={startEncounterCallback}>
            Begin encounter
          </Button>
        </Box>
      </Content>
    </>
  );
};
