import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Popover,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addEffect, addOrDeleteAffected, deleteEffect, Effect } from '../../store/reducers/encounterPlayReducer';
import { Page, setPage } from '../../store/reducers/globalReducer';
import { ReducerNames } from '../../store/reducers/reducerNames';
import { EffectsProgressbar } from './EffectsProgressbar';

const NewEffectPanel = () => {
  const dispatch = useAppDispatch();

  const [effectType, setEffectType] = useState<'progress' | 'lasting'>('progress');
  const [effectName, setEffectName] = useState('');
  const [duration, setDuration] = useState('');

  return (
    <Stack direction="column">
      <Stack direction="row" alignItems="center">
        <TextField
          label="Effect name"
          defaultValue=""
          size="small"
          InputLabelProps={{ shrink: true }}
          sx={{
            minWidth: '15rem',
            m: 1,
            ml: 0,
          }}
          onChange={(e) => {
            setEffectName(e.target.value);
          }}
        />
        <Divider orientation="vertical" flexItem />
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  ml: 1,
                }}
                onChange={(e) => {
                  if (e.target.checked) {
                    setEffectType('lasting');
                  } else {
                    setEffectType('progress');
                  }
                }}
              />
            }
            label="Lasting effect"
          />
        </FormGroup>
      </Stack>

      {effectType === 'progress' && (
        <>
          <Divider flexItem />
          <Stack direction="row" alignItems="center">
            <TextField
              label="Duration (seconds)"
              defaultValue=""
              size="small"
              InputLabelProps={{ shrink: true }}
              sx={{
                minWidth: '15rem',
                m: 1,
                ml: 0,
              }}
              onChange={(e) => {
                setDuration(e.target.value);
              }}
            />
          </Stack>
        </>
      )}

      <Divider flexItem />

      <Stack direction="row" alignItems="center">
        <Button
          variant="contained"
          onClick={() => {
            let success = false;

            if (effectType === 'progress') {
              const durationInt = parseInt(duration) || 0;

              if (durationInt !== 0) {
                dispatch(
                  addEffect({
                    type: 'progress',
                    name: effectName,
                    duration: durationInt,
                  }),
                );

                success = true;
              }
            } else {
              dispatch(
                addEffect({
                  type: 'lasting',
                  name: effectName,
                }),
              );

              success = true;
            }

            if (success) {
              // TODO reset all fields
            }
          }}
          sx={{
            m: 1,
            alignSelf: 'center',
          }}
        >
          Add effect
        </Button>
      </Stack>
    </Stack>
  );
};

export const EncounterCombatEffectsPanel = () => {
  const dispatch = useAppDispatch();

  const { effects, encounter, entities } = useAppSelector((state) => state[ReducerNames.ENCOUNTER_PLAY]);

  const [changeAffectedAnchorEl, setChangeAffectedAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [changeAffectedPopoverContext, setChangeAffectedPopoverContext] = React.useState<Effect | null>(null);

  if (encounter === null) {
    dispatch(setPage(Page.ENCOUNTERS));
    return <div />;
  }

  const handleChangeAffectedPopoverOpen = (event: React.MouseEvent<HTMLButtonElement>, effect: Effect) => {
    setChangeAffectedAnchorEl(event.currentTarget);
    setChangeAffectedPopoverContext(effect);
  };

  const handleChangeAffectedPopoverClose = () => {
    setChangeAffectedAnchorEl(null);
    setChangeAffectedPopoverContext(null);
  };

  const changeAffectedOpen = Boolean(changeAffectedAnchorEl);

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        p: 1,
        pb: 0,
        pt: 0,
        width: '30%',
      }}
    >
      <Stack direction="column">
        <Box>
          <NewEffectPanel />
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Box>
          <Typography variant="h5">Active effects</Typography>
          {effects.map((effect) => {
            return (
              <Box key={effect.id}>
                <p>
                  <strong>Effect:</strong>&nbsp;{effect.name}
                </p>
                {effect.type === 'progress' ? (
                  <>
                    <p>
                      <strong>Active:</strong>&nbsp;{effect.active ? 'Yes' : 'No'}
                    </p>
                    <p>
                      <strong>Progress:</strong>&nbsp;
                      {`${effect.progress > effect.duration ? effect.duration : effect.progress} / ${effect.duration}`}
                    </p>
                  </>
                ) : (
                  <p>
                    <strong>Progress:</strong>&nbsp;Lasting
                  </p>
                )}
                <p>
                  <strong>Affected:</strong>
                  &nbsp;
                  {effect.affected.length === 0
                    ? 'Nobody'
                    : effect.affected.map((affected) => affected.name).join(', ')}
                </p>
                {effect.type === 'progress' && (
                  <>
                    <EffectsProgressbar
                      current={effect.progress > effect.duration ? effect.duration : effect.progress}
                      max={effect.duration}
                    />
                  </>
                )}
                <Divider />
                <Stack direction="row" alignItems="center" justifyContent="center">
                  <Button
                    variant="contained"
                    onClick={(element) => handleChangeAffectedPopoverOpen(element, effect)}
                    sx={{
                      m: 1,
                    }}
                  >
                    Change affected
                  </Button>
                  <Divider orientation="vertical" flexItem />
                  <Button
                    variant="contained"
                    onClick={() => dispatch(deleteEffect(effect.id))}
                    sx={{
                      m: 1,
                    }}
                  >
                    Edit
                  </Button>
                  <Divider orientation="vertical" flexItem />
                  <Button
                    variant="contained"
                    onClick={() => dispatch(deleteEffect(effect.id))}
                    sx={{
                      m: 1,
                    }}
                  >
                    Delete effect
                  </Button>
                </Stack>
                <Divider />
                <Popover
                  id={`popover_conditions_${effect.id}`}
                  open={changeAffectedOpen}
                  anchorEl={changeAffectedAnchorEl}
                  onClose={handleChangeAffectedPopoverClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                >
                  <Box sx={{ m: 1 }}>
                    <FormGroup>
                      {entities.map((entity) => {
                        if (changeAffectedPopoverContext === null) {
                          return <div />;
                        }

                        return (
                          <FormControlLabel
                            control={
                              <Checkbox
                                defaultChecked={changeAffectedPopoverContext?.affected.some(
                                  (affected) => affected.id === entity.id,
                                )}
                                onChange={(event) => {
                                  const enabled = event.target.checked;

                                  dispatch(
                                    addOrDeleteAffected({
                                      id: effect.id,
                                      affected: {
                                        id: entity.id,
                                        name: entity.name,
                                        enabled,
                                      },
                                    }),
                                  );
                                }}
                              />
                            }
                            label={entity.name}
                          />
                        );
                      })}
                    </FormGroup>
                  </Box>
                </Popover>
              </Box>
            );
          })}
        </Box>
      </Stack>
    </Box>
  );
};
