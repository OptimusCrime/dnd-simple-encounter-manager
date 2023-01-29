import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { InitiativeEntityState } from '../../pages/EncounterPlay.types';
import { findMaxId } from '../../utilities/findMaxId';
import { getItem } from '../../utilities/localStorage';
import { Encounter } from './encountersReducer';
import { ReducerNames } from './reducerNames';

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
  startHealth: number | null;
  currentHealth: number | null;
  isPlayerCharacter: boolean;
  isSurprised: boolean;
  isDead: boolean;
  inPlay: boolean;
  conditions: Condition[];
}

interface EffectBase {
  id: number;
  name: string;
  active: boolean;
  affected: { id: number; name: string }[];
}

export interface EffectProgress {
  type: 'progress';
  duration: number;
  progress: number;
}

export interface EffectLasting {
  type: 'lasting';
}

export type Effect = EffectBase & (EffectProgress | EffectLasting);

interface EncounterPlayState {
  phase: Phase;
  encounter: Encounter | null;
  currentInitiative: number;
  round: number;
  entities: PlayEntity[];
  effects: Effect[];
}

interface AddEffectProgress {
  type: 'progress';
  name: string;
  duration: number;
}

interface AddEffectLasting {
  type: 'lasting';
  name: string;
}

type AddEffectType = AddEffectProgress | AddEffectLasting;

const fallbackInitialState: EncounterPlayState = {
  phase: Phase.INITIATIVE,
  encounter: null,
  currentInitiative: 0,
  round: 0,
  entities: [],
  effects: [],
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

const calculateCurrentHealth = (entity: InitiativeEntityState): number | null => {
  if (entity.isPlayerCharacter) {
    return null;
  }

  if (entity.startHealth === null || entity.initialDamageTaken === null) {
    return entity.startHealth;
  }

  return entity.startHealth - entity.initialDamageTaken;
};

const calculateNextRound = (entities: PlayEntity[]) => {
  // First check if there are any alive creatures in the current round
  let counter = 1;
  for (const character of entities) {
    if (!character.isDead) {
      return counter;
    }

    counter++;
  }

  return null;
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
      state.round = 0;
      state.currentInitiative = 0;
      state.entities = action.payload
        .sort((a, b) => {
          return a.order - b.order;
        })
        .map((entity) => {
          const currentHealth = calculateCurrentHealth(entity);

          return {
            id: entity.id,
            name: getName(entity, action.payload),
            initiative: entity.order,
            startHealth: entity.startHealth,
            currentHealth,
            isPlayerCharacter: entity.isPlayerCharacter,
            isSurprised: entity.isSurprised,
            isDead: currentHealth !== null && currentHealth < 0,
            inPlay: entity.inPlay,
            conditions: [],
          };
        });
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
      state.entities = state.entities.map((entity) => {
        if (entity.id !== action.payload.id) {
          return entity;
        }

        return {
          ...entity,
          isSurprised: false,
        };
      });

      state.effects = state.effects.map((effect) => {
        if (effect.type === 'lasting') {
          return effect;
        }

        const progress = effect.progress === effect.duration ? effect.duration : effect.progress + 1;

        return {
          ...effect,
          progress,
          active: effect.progress !== effect.duration,
        };
      });

      // First try to calculate same round
      const sameRoundInitiative = calculateNextRound(state.entities.slice(state.currentInitiative + 1));
      if (sameRoundInitiative !== null) {
        state.currentInitiative = state.currentInitiative + sameRoundInitiative;
        return;
      }

      // No alive creatures in the round, check from the top
      const nextRoundInitiative = calculateNextRound(state.entities.slice(state.currentInitiative + 1));
      if (nextRoundInitiative === null) {
        // Panic!
        state.currentInitiative = 0;
        state.round = 1;
        return;
      }

      state.currentInitiative = nextRoundInitiative;
      state.round = state.round + 1;
    },
    previousRound(state) {
      const numberOfEntities = state.entities.length;

      // TODO: Handle 0 HP
      if (state.currentInitiative === 0) {
        state.round = state.round - 1;
        state.currentInitiative = numberOfEntities - 1;
      } else {
        state.currentInitiative = state.currentInitiative - 1;
      }

      state.effects = state.effects.map((effect) => {
        if (effect.type === 'lasting') {
          return effect;
        }

        const progress = effect.progress === 0 ? 0 : effect.progress - 1;

        return {
          ...effect,
          progress,
          active: progress <= effect.duration,
        };
      });
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
    addEffect(state, action: PayloadAction<AddEffectType>) {
      const maxId = findMaxId(state.effects);

      if (action.payload.type === 'progress') {
        state.effects.push({
          id: maxId + 1,
          type: 'progress',
          name: action.payload.name,
          active: true,
          // Each round in combat takes 6 seconds. An effect lasting 60 seconds lasts for 10 rounds
          duration: Math.round(action.payload.duration / 6),
          progress: 0,
          affected: [],
        });
      } else {
        state.effects.push({
          id: maxId + 1,
          type: 'lasting',
          name: action.payload.name,
          active: true,
          affected: [],
        });
      }
    },
    deleteEffect(state, action: PayloadAction<number>) {
      state.effects = state.effects.filter((effect) => effect.id !== action.payload);
    },
    addOrDeleteAffected(
      state,
      action: PayloadAction<{ id: number; affected: { id: number; name: string; enabled: boolean } }>,
    ) {
      state.effects = state.effects.map((effect) => {
        if (effect.id !== action.payload.id) {
          return effect;
        }

        if (action.payload.affected.enabled) {
          return {
            ...effect,
            affected: [...effect.affected, { id: action.payload.affected.id, name: action.payload.affected.name }],
          };
        }

        return {
          ...effect,
          affected: effect.affected.filter((affected) => affected.id !== action.payload.affected.id),
        };
      });
    },
  },
});

export const {
  setPlayEncounter,
  beginEncounter,
  updateHealth,
  nextRound,
  previousRound,
  updateCondition,
  addEffect,
  deleteEffect,
  addOrDeleteAffected,
} = encounterPlayReducer.actions;

export default encounterPlayReducer.reducer;
