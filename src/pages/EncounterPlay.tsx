import React, { useState } from 'react';

import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  List,
  ListItem,
  Popover,
  Stack,
  Switch,
  TextField,
} from '@mui/material';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { ReducerNames } from '../store/reducers/reducerNames';
import { Page, setPage } from '../store/reducers/globalReducer';
import {
  beginEncounter,
  Condition,
  nextRound,
  Phase,
  PlayEntity,
  updateCondition,
  updateHealth,
} from '../store/reducers/encounterPlayReducer';
import { Content } from '../layout/Content';
import { Encounter, Entity } from '../store/reducers/encountersReducer';
import { InitiativeEntityState } from './EncounterPlay.types';

enum MoveDirection {
  UP,
  DOWN,
}

const mapEntityToInitiativeState = (entity: Entity, index: number): InitiativeEntityState => {
  const { id, name, startHealth, isPlayerCharacter } = entity;

  return {
    id,
    name,
    order: index,
    startHealth,
    physicalIdentifier: '',
    isPlayerCharacter,
    isSurprised: false,
    inPlay: true,
    initiative: null,
  };
};

const mapEncounterToInitiativeState = (encounter: Encounter): InitiativeEntityState[] => {
  // Let's always put the players on top
  const { entities } = encounter;

  const entitiesWithPlayersFirst = [
    ...entities.filter((entity) => entity.isPlayerCharacter),
    ...entities.filter((entity) => !entity.isPlayerCharacter),
  ];

  return [...entitiesWithPlayersFirst.map((entity, index) => mapEntityToInitiativeState(entity, index))];
};

const EncounterPlayPhaseInitiative = ({ encounter }: { encounter: Encounter }) => {
  const dispatch = useAppDispatch();

  const [state, setState] = useState<InitiativeEntityState[]>(mapEncounterToInitiativeState(encounter));

  const { name } = encounter;

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

  return (
    <>
      <Content title={`Decide initiative: ${name}`}>
        <Box
          sx={{
            backgroundColor: '#fff',
            mt: 1,
            p: 1,
            pt: 2,
          }}
        >
          <Box>
            <List>
              {sortedState.map((entity) => (
                <ListItem
                  key={entity.id}
                  sx={{
                    backgroundColor: '#eee',
                    mb: 1,
                    width: '100%',
                    borderRadius: '4px 4px',
                  }}
                  secondaryAction={
                    <>
                      {entity.order + 1 !== numberOfEntities && (
                        <IconButton
                          edge="end"
                          tabIndex={-1}
                          onClick={() => moveEntityUpOrDown(entity.id, MoveDirection.DOWN)}
                        >
                          <ArrowDownward />
                        </IconButton>
                      )}
                      {entity.order > 0 && (
                        <IconButton
                          edge="end"
                          tabIndex={-1}
                          onClick={() => moveEntityUpOrDown(entity.id, MoveDirection.UP)}
                        >
                          <ArrowUpward />
                        </IconButton>
                      )}
                    </>
                  }
                >
                  <Stack direction="column" alignItems="flex-end" justifyContent="space-between" spacing={1}>
                    <Stack direction="row" alignItems="left" spacing={1}>
                      <Stack
                        direction="column"
                        alignItems="flex-start"
                        justifyContent="space-between"
                        spacing={1}
                        sx={{
                          alignSelf: 'center',
                          minWidth: '15rem',
                        }}
                      >
                        {`${entity.name} ${entity.isPlayerCharacter ? '' : `(${entity.startHealth} HP)`}`}
                      </Stack>

                      <Divider orientation="vertical" flexItem />

                      <Stack
                        direction="column"
                        alignItems="flex-start"
                        justifyContent="space-between"
                        spacing={1}
                        sx={{ alignSelf: 'center' }}
                      >
                        <TextField
                          label="Initiative"
                          defaultValue=""
                          inputProps={{ tabIndex: entity.order + 100 }}
                          variant="standard"
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
                      </Stack>

                      <Divider orientation="vertical" flexItem />

                      {!entity.isPlayerCharacter && (
                        <Stack
                          direction="column"
                          alignItems="flex-start"
                          justifyContent="space-between"
                          spacing={1}
                          sx={{ alignSelf: 'center' }}
                        >
                          <TextField
                            label="Physical identifier"
                            defaultValue=""
                            inputProps={{ tabIndex: -1 }}
                            variant="standard"
                            onChange={(event) => {
                              const value = event.target.value;
                              updateState(entity.id, {
                                physicalIdentifier: value,
                              });
                            }}
                          />
                        </Stack>
                      )}

                      <Divider orientation="vertical" flexItem />

                      <Stack
                        direction="column"
                        alignItems="flex-start"
                        justifyContent="space-between"
                        spacing={1}
                        sx={{ alignSelf: 'center' }}
                      >
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Switch
                                tabIndex={-1}
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

                      <Divider orientation="vertical" flexItem />

                      <Stack
                        direction="column"
                        alignItems="flex-start"
                        justifyContent="space-between"
                        spacing={1}
                        sx={{ alignSelf: 'center' }}
                      >
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Switch
                                tabIndex={-1}
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
            mt: 2,
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

const EncounterPlayPhasePlay = ({ encounter }: { encounter: Encounter }) => {
  const dispatch = useAppDispatch();

  const { entities, currentInitiative, round } = useAppSelector((state) => state[ReducerNames.ENCOUNTER_PLAY]);

  const { name } = encounter;

  const isCurrentTurn = (entity: PlayEntity, currentInitiative: number): boolean => {
    return entity.initiative === currentInitiative;
  };

  const getBoxColor = (entity: PlayEntity, currentInitiative: number): string => {
    if (entity.isDead) {
      return '#ef5350';
    }

    if (isCurrentTurn(entity, currentInitiative)) {
      return '#4caf50';
    }

    return '#eee';
  };

  const [conditionsAnchorEl, setConditionsAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [conditionsPopoverContext, setConditionsPopoverContext] = React.useState<PlayEntity | null>(null);

  const handleConditionsPopoverOpen = (event: React.MouseEvent<HTMLButtonElement>, entity: PlayEntity) => {
    setConditionsAnchorEl(event.currentTarget);
    setConditionsPopoverContext(entity);
  };

  const handleConditionsPopoverClose = () => {
    setConditionsAnchorEl(null);
    setConditionsPopoverContext(null);
  };

  const conditionsOpen = Boolean(conditionsAnchorEl);

  const numberOfEntities = entities.length;

  return (
    <>
      <Content title={`Playing encounter: ${name} -- Round #${round + 1}`}>
        <Box
          sx={{
            backgroundColor: '#fff',
            mt: 1,
            p: 1,
            pt: 2,
          }}
        >
          <Box>
            <List>
              {entities.map((entity) => (
                <ListItem
                  key={entity.initiative}
                  sx={{
                    backgroundColor: getBoxColor(entity, currentInitiative),
                    mb: 1,
                    width: '100%',
                    borderRadius: '4px 4px',
                  }}
                >
                  <Stack
                    direction="column"
                    justifyContent="space-between"
                    spacing={1}
                    sx={{
                      width: '100%',
                    }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="flex-start"
                      sx={{
                        mb: 1,
                        alignItems: 'center',
                      }}
                      spacing={1}
                    >
                      <Box sx={{ minWidth: '15rem' }}>
                        <strong>{entity.initiative + 1}.</strong> {entity.name}{' '}
                        {entity.physicalObject.length === 0 ? '' : ` (${entity.physicalObject})`}
                      </Box>
                      {entity.isSurprised && (
                        <>
                          <Divider orientation="vertical" flexItem />
                          <strong>SURPRISED!</strong>
                        </>
                      )}
                      <Divider orientation="vertical" flexItem />
                      <strong>Conditions:</strong>{' '}
                      {entity.conditions.length === 0 ? 'None' : entity.conditions.join(', ')}
                      <Box
                        sx={{
                          // Bah, come on
                          marginLeft: 'auto !important',
                          justifyContent: 'center',
                        }}
                      >
                        <Button variant="contained" onClick={(element) => handleConditionsPopoverOpen(element, entity)}>
                          Change conditions
                        </Button>
                        <Popover
                          id={`popover_conditions_${entity.id}`}
                          open={conditionsOpen}
                          anchorEl={conditionsAnchorEl}
                          onClose={handleConditionsPopoverClose}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                          }}
                        >
                          <Box sx={{ m: 1 }}>
                            <FormGroup>
                              {Object.keys(Condition).map((key) => {
                                if (conditionsPopoverContext === null) {
                                  return <div />;
                                }

                                // Stupid
                                const enumKey = key as keyof typeof Condition;
                                const value = Condition[enumKey];

                                return (
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        defaultChecked={conditionsPopoverContext.conditions.includes(value)}
                                        onChange={(event) => {
                                          const enabled = event.target.checked;

                                          dispatch(
                                            updateCondition({
                                              id: conditionsPopoverContext.id,
                                              condition: value,
                                              enabled,
                                            }),
                                          );
                                        }}
                                      />
                                    }
                                    label={Condition[enumKey]}
                                  />
                                );
                              })}
                            </FormGroup>
                          </Box>
                        </Popover>
                      </Box>
                    </Stack>
                    <Stack direction="row" justifyContent="center" spacing={1}>
                      {!entity.isPlayerCharacter && (
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1, mb: 1 }}>
                          <Button
                            variant="contained"
                            sx={{ mr: 1 }}
                            onClick={() => dispatch(updateHealth({ id: entity.id, change: -10 }))}
                          >
                            -10HP
                          </Button>
                          <Button
                            variant="contained"
                            sx={{ mr: 1 }}
                            onClick={() => dispatch(updateHealth({ id: entity.id, change: -5 }))}
                          >
                            -5HP
                          </Button>
                          <Button
                            variant="contained"
                            onClick={() => dispatch(updateHealth({ id: entity.id, change: -1 }))}
                          >
                            -1HP
                          </Button>
                          <span
                            style={{
                              margin: '0 2rem',
                            }}
                          >
                            {entity.currentHealth}HP / {entity.startHealth}HP
                          </span>
                          <Button
                            variant="contained"
                            sx={{ mr: 1 }}
                            onClick={() => dispatch(updateHealth({ id: entity.id, change: 1 }))}
                          >
                            +1HP
                          </Button>
                          <Button
                            variant="contained"
                            sx={{ mr: 1 }}
                            onClick={() => dispatch(updateHealth({ id: entity.id, change: 5 }))}
                          >
                            +5HP
                          </Button>
                          <Button
                            variant="contained"
                            onClick={() => dispatch(updateHealth({ id: entity.id, change: 10 }))}
                          >
                            +10HP
                          </Button>
                        </Stack>
                      )}
                    </Stack>
                    {isCurrentTurn(entity, currentInitiative) && (
                      <Stack direction="row" justifyContent="end" spacing={1}>
                        <Button variant="contained" onClick={() => dispatch(nextRound({ id: entity.id }))}>
                          Next character ({currentInitiative === numberOfEntities - 1 ? 1 : currentInitiative + 2} /{' '}
                          {numberOfEntities})
                        </Button>
                      </Stack>
                    )}
                  </Stack>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Content>
    </>
  );
};

export const EncounterPlay = () => {
  const { phase, encounter } = useAppSelector((state) => state[ReducerNames.ENCOUNTER_PLAY]);
  const dispatch = useAppDispatch();

  if (!encounter) {
    dispatch(setPage(Page.ENCOUNTERS));

    // The fuck
    return <div></div>;
  }

  switch (phase) {
    case Phase.INITIATIVE:
      return <EncounterPlayPhaseInitiative encounter={encounter} />;
    case Phase.PLAY:
    default:
      return <EncounterPlayPhasePlay encounter={encounter} />;
  }
};
