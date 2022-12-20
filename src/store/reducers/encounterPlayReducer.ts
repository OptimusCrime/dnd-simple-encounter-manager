import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ReducerNames } from './reducerNames';
import { getItem } from '../../utilities/localStorage';
import { Encounter } from './encountersReducer';
import { InitiativeEntityState } from '../../pages/EncounterPlay.types';

export enum Phase {
  INITIATIVE = 'initiative',
  PLAY = 'play',
}

export enum Condition {
  BLINDED = 'Blinded',
  CHARMED = 'Charmed',
  DEAFENED = 'Deafened',
  FRIGHTENED = 'Frightened',
  GRAPPLED = 'Grappled',
  INCAPACITATED = 'Incapacitated',
  INVISIBLE = 'Invisible',
  PARALYZED = 'Paralyzed',
  PETRIFIED = 'Petrified',
  POISONED = 'Poisoned',
  PRONE = 'Prone',
  RESTRAINED = 'Restrained',
  STUNNED = 'Stunned',
  UNCONSCIOUS_OR_SLEEPING = 'Unconscious/Sleeping',
  EXHAUSTION = 'Exhaustion',
}

export interface PlayEntity {
  id: number;
  name: string;
  initiative: number;
  physicalObject: string;
  startHealth: number | null;
  currentHealth: number | null;
  isPlayerCharacter: boolean;
  isSurprised: boolean;
  isDead: boolean;
  inPlay: boolean;
  conditions: Condition[];
}

interface EncounterPlayState {
  phase: Phase;
  encounter: Encounter | null;
  currentInitiative: number;
  round: number;
  entities: PlayEntity[];
}

const fallbackInitialState: EncounterPlayState = {
  phase: Phase.INITIATIVE,
  encounter: null,
  currentInitiative: 0,
  round: 0,
  entities: [],
};

const getInitialState = (): EncounterPlayState => {
  const localStorage = getItem<EncounterPlayState>(ReducerNames.ENCOUNTER_PLAY);
  if (localStorage) {
    return {
      ...fallbackInitialState,
      ...localStorage,
    };
  }

  return fallbackInitialState;
};

const getName = (entity: InitiativeEntityState, entities: InitiativeEntityState[]) => {
  if (entity.isPlayerCharacter) {
    return entity.name;
  }

  // Check for identical names
  const entitiesWithSameName = entities.filter((e) => e.name === entity.name);
  if (entitiesWithSameName.length === 1) {
    return entity.name;
  }

  // Multiple names, find out current order
  const index = entities.findIndex((e) => e.order === entity.order);

  // I guess this can never happen, but who cares
  if (index === -1) {
    return entity.name;
  }

  return `${entity.name} #${index + 1}`;
};

const encounterPlayReducer = createSlice({
  name: ReducerNames.ENCOUNTER_PLAY,
  initialState: getInitialState(),
  reducers: {
    setPlayEncounter(state, action: PayloadAction<Encounter | null>) {
      state.encounter = action.payload;
      state.phase = Phase.INITIATIVE;
    },
    beginEncounter(state, action: PayloadAction<InitiativeEntityState[]>) {
      state.phase = Phase.PLAY;
      state.currentInitiative = 0;
      state.entities = action.payload
        .sort((a, b) => {
          return a.order - b.order;
        })
        .map((entity) => ({
          id: entity.id,
          name: getName(entity, action.payload),
          initiative: entity.order,
          physicalObject: entity.physicalIdentifier,
          startHealth: entity.startHealth,
          currentHealth: entity.startHealth,
          isPlayerCharacter: entity.isPlayerCharacter,
          isSurprised: entity.isSurprised,
          isDead: false,
          inPlay: entity.inPlay,
          conditions: [],
        }));
    },
    updateHealth(state, action: PayloadAction<{ id: number; change: number }>) {
      state.entities = state.entities.map((entity) => {
        if (entity.id !== action.payload.id) {
          return entity;
        }

        if (entity.currentHealth === null) {
          return entity;
        }

        const newHealth = entity.currentHealth + action.payload.change;

        return {
          ...entity,
          currentHealth: newHealth,
          isDead: newHealth <= 0,
        };
      });
    },
    nextRound(state, action: PayloadAction<{ id: number }>) {
      const numberOfEntities = state.entities.length;
      state.entities = state.entities.map((entity) => {
        if (entity.id !== action.payload.id) {
          return entity;
        }

        return {
          ...entity,
          isSurprised: false,
        };
      });

      const isNewRound = numberOfEntities === state.currentInitiative + 1;

      state.currentInitiative = isNewRound ? 0 : state.currentInitiative + 1;
      if (isNewRound) {
        state.round = state.round + 1;
      }
    },
    updateCondition(
      state,
      action: PayloadAction<{
        id: number;
        condition: Condition;
        enabled: boolean;
      }>,
    ) {
      state.entities = state.entities.map((entity) => {
        const { id, condition, enabled } = action.payload;

        if (entity.id !== id) {
          return entity;
        }

        if (enabled) {
          return {
            ...entity,
            conditions: [...entity.conditions, condition],
          };
        }

        return {
          ...entity,
          conditions: entity.conditions.filter((c) => c !== condition),
        };
      });
    },
  },
});

export const { setPlayEncounter, beginEncounter, updateHealth, nextRound, updateCondition } =
  encounterPlayReducer.actions;

export default encounterPlayReducer.reducer;
