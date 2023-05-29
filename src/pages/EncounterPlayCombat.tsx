import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
  Popover,
  Stack,
  TextField,
} from '@mui/material';
import React from 'react';

import { Content } from '../layout/Content';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  Condition,
  nextRound,
  PlayEntity,
  previousRound,
  updateCondition,
  updateHealth,
} from '../store/reducers/encounterPlayReducer';
import { Page, setPage } from '../store/reducers/globalReducer';
import { ReducerNames } from '../store/reducers/reducerNames';
import { EncounterCombatEffectsPanel } from './EncounterPlay/EncounterCombatEffectsPanel';

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

export const EncounterPlayCombat = () => {
  const dispatch = useAppDispatch();

  const { encounter, entities, currentInitiative, effects, round } = useAppSelector(
    (state) => state[ReducerNames.ENCOUNTER_PLAY],
  );

  const [conditionsAnchorEl, setConditionsAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [conditionsPopoverContext, setConditionsPopoverContext] = React.useState<PlayEntity | null>(null);

  const [changeHealthAnchorEl, setChangeHealthAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const changeHealthInputRef = React.useRef<null | HTMLInputElement>(null);
  const [changeHealthPopoverContext, setChangeHealthPopoverContext] = React.useState<{
    entity: PlayEntity;
    mode: 'plus' | 'minus';
  } | null>(null);

  if (encounter === null) {
    dispatch(setPage(Page.ENCOUNTERS));
    return <div />;
  }

  const { name } = encounter;

  const handleConditionsPopoverOpen = (event: React.MouseEvent<HTMLButtonElement>, entity: PlayEntity) => {
    setConditionsAnchorEl(event.currentTarget);
    setConditionsPopoverContext(entity);
  };

  const handleConditionsPopoverClose = () => {
    setConditionsAnchorEl(null);
    setConditionsPopoverContext(null);
  };

  const handleChangeHealthPopoverOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    entity: PlayEntity,
    mode: 'plus' | 'minus',
  ) => {
    setChangeHealthAnchorEl(event.currentTarget);
    setChangeHealthPopoverContext({
      entity,
      mode,
    });

    setTimeout(() => {
      changeHealthInputRef.current?.focus();
    }, 100);
  };

  const handleChangeHealthPopoverClose = () => {
    setChangeHealthAnchorEl(null);
    setChangeHealthPopoverContext(null);
  };

  const conditionsOpen = Boolean(conditionsAnchorEl);
  const changeHealthOpen = Boolean(changeHealthAnchorEl);

  const numberOfEntities = entities.length;

  return (
    <>
      <Container
        sx={{
          mt: 2,
        }}
      >
        <Content title={`${name} [round: ${round + 1}]`} />
      </Container>
      <Box
        sx={{
          pl: 10,
          pr: 10,
          display: 'flex',
          margin: 'auto',
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            width: '100%',
          }}
        >
          <Box
            sx={{
              backgroundColor: '#fff',
              p: 1,
              pb: 0,
              pt: 0,
              width: '65%',
            }}
          >
            <Box>
              <List sx={{ pb: 1 }}>
                {entities.map((entity, idx) => (
                  <ListItem
                    key={entity.initiative}
                    sx={{
                      backgroundColor: getBoxColor(entity, currentInitiative),
                      mb: idx + 1 === numberOfEntities ? 0 : 1,
                      width: '100%',
                      borderRadius: '4px 4px',
                      p: 1,
                    }}
                  >
                    <Stack
                      direction="column"
                      justifyContent="space-between"
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
                      >
                        <Box sx={{ minWidth: '15rem' }}>
                          <strong>{entity.initiative + 1}.</strong> {entity.name}
                        </Box>
                        {entity.isSurprised && (
                          <>
                            <Divider orientation="vertical" flexItem />
                            <strong>SURPRISED!</strong>
                          </>
                        )}
                        <Divider orientation="vertical" flexItem sx={{ mr: 1 }} />
                        {entity.conditions.length === 0 &&
                        !effects.find(
                          (effect) => effect.active && effect.affected.some((affected) => affected.id === entity.id),
                        ) ? (
                          <em>No effects or conditions</em>
                        ) : (
                          <>
                            <>
                              <strong>Effects:</strong>&nbsp;
                              {effects
                                .filter(
                                  (effect) =>
                                    effect.active && effect.affected.some((affected) => affected.id === entity.id),
                                )
                                .map((effect) => effect.name)
                                .join(', ')}
                              &nbsp;
                            </>
                            {entity.conditions.length > 0 && (
                              <>
                                <strong>Conditions:</strong>&nbsp;
                                {entity.conditions.join(', ')}
                              </>
                            )}
                          </>
                        )}
                        <Box
                          sx={{
                            // Bah, come on
                            marginLeft: 'auto !important',
                            justifyContent: 'center',
                          }}
                        >
                          <Button
                            variant="contained"
                            onClick={(element) => handleConditionsPopoverOpen(element, entity)}
                          >
                            Conditions
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
                                            handleConditionsPopoverClose();
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
                      <Stack direction="row">
                        {!entity.isPlayerCharacter && (
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{ mt: 1, mb: 1 }}
                          >
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
                              sx={{ mr: 1 }}
                              onClick={() => dispatch(updateHealth({ id: entity.id, change: -1 }))}
                            >
                              -1HP
                            </Button>
                            <Button
                              variant="contained"
                              onClick={(element) => handleChangeHealthPopoverOpen(element, entity, 'minus')}
                            >
                              -
                            </Button>
                            <span
                              style={{
                                margin: '0 1rem',
                              }}
                            >
                              {entity.currentHealth}HP / {entity.startHealth}HP
                            </span>

                            <Popover
                              id={`popover_health_${entity.id}`}
                              open={changeHealthOpen}
                              anchorEl={changeHealthAnchorEl}
                              onClose={handleChangeHealthPopoverClose}
                              anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                              }}
                            >
                              <Box sx={{ m: 1 }}>
                                <TextField
                                  label={
                                    changeHealthPopoverContext?.mode === 'plus' ? 'Increase health' : 'Decrease health'
                                  }
                                  defaultValue=""
                                  inputRef={changeHealthInputRef}
                                  InputLabelProps={{ shrink: true }}
                                  size="small"
                                  sx={{ mr: 1, ml: 1 }}
                                  onKeyUp={(event) => {
                                    if (
                                      event.key.toLowerCase() === 'enter' &&
                                      changeHealthInputRef?.current?.value &&
                                      changeHealthPopoverContext?.entity
                                    ) {
                                      const value = changeHealthInputRef.current?.value;

                                      if (/^[0-9]+$/.test(value)) {
                                        dispatch(
                                          updateHealth({
                                            id: changeHealthPopoverContext.entity.id,
                                            change:
                                              parseInt(value) * (changeHealthPopoverContext?.mode === 'plus' ? 1 : -1),
                                          }),
                                        );
                                      }

                                      handleChangeHealthPopoverClose();
                                    }
                                  }}
                                />
                              </Box>
                            </Popover>
                            <Button
                              variant="contained"
                              sx={{ mr: 1 }}
                              onClick={(element) => handleChangeHealthPopoverOpen(element, entity, 'plus')}
                            >
                              +
                            </Button>
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
                        <Stack direction="row" justifyContent="end">
                          <Button variant="contained" onClick={() => dispatch(previousRound())} sx={{ mr: 1 }}>
                            Previous
                          </Button>
                          <Button variant="contained" onClick={() => dispatch(nextRound({ id: entity.id }))}>
                            Next
                          </Button>
                        </Stack>
                      )}
                    </Stack>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
          <EncounterCombatEffectsPanel />
        </Stack>
      </Box>
    </>
  );
};
