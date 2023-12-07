import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

import { InitiativeEntityState } from '../../../pages/EncounterInitiative/types';
import { calculateHealth } from '../../../utilities/calculateHealth';
import { InitiativeQueue } from '../../../utilities/InitiativeQueue';
import { ReducerNames } from '../reducerNames';
import { mapInitiativeEntityStateToEncounterPlayEntity } from './mappers';
import { AddEffectType } from './reducerTypes';
import { getInitialState } from './state';
import { Condition } from './types';

const encounterPlayReducer = createSlice({
  name: ReducerNames.ENCOUNTER_PLAY,
  initialState: getInitialState(),
  reducers: {
    /**
     * Starts the actual encounter.
     *
     * @param state
     * @param action
     */
    beginEncounter(state, action: PayloadAction<{ name: string; entities: InitiativeEntityState[] }>) {
      state.name = action.payload.name;
      state.round = 0;
      state.currentTurn = action.payload.entities[0].id;
      state.entities = action.payload.entities
        .sort((a, b) => a.order - b.order)
        .map((entity) => mapInitiativeEntityStateToEncounterPlayEntity(entity, action.payload.entities));
      state.effects = [];
    },

    /**
     * Updates the health for an entity.
     *
     * @param state
     * @param action
     */
    updateHealth(state, action: PayloadAction<{ id: string; change: number }>) {
      state.entities = state.entities.map((entity) => {
        if (entity.id !== action.payload.id) {
          return entity;
        }

        if (entity.healthCurrent === null) {
          return entity;
        }

        const newHealth = entity.healthCurrent + action.payload.change;

        return {
          ...entity,
          healthCurrent: newHealth,
          isDead: newHealth <= 0,
        };
      });
    },

    /**
     * Move to the next entity.
     *
     * @param state
     */
    nextRound(state) {
      state.entities = state.entities.map((entity) => {
        if (entity.id !== state.currentTurn) {
          return entity;
        }

        return {
          ...entity,
          isSurprised: false,
        };
      });

      const queue = new InitiativeQueue(state.entities);

      const nextTurnResponse = queue.findNextTurn(state.currentTurn);
      if (nextTurnResponse === null) {
        // Panic! at the disco
        return;
      }

      const { current, passed } = nextTurnResponse;

      state.effects = state.effects.map((effect) => {
        if (effect.type === 'lasting') {
          return effect;
        }

        const increaseProgress = passed.includes(effect.startedWith);

        if (!increaseProgress) {
          return effect;
        }

        if (!effect.initialRoundPassed) {
          return {
            ...effect,
            initialRoundPassed: true,
          };
        }

        const progress = effect.progress === effect.duration ? effect.duration : effect.progress + 1;

        return {
          ...effect,
          progress,
          actualProgress: effect.actualProgress + 1,
          active: effect.progress !== effect.duration,
        };
      });

      state.currentTurn = current.id;

      // If the next entity is the first entity, then we are on the next round
      if (current.isFirstElement) {
        state.round++;
      }
    },

    /**
     * Move back to the previous entity.
     *
     * @param state
     */
    previousRound(state) {
      const queue = new InitiativeQueue(state.entities);

      const previousTurnResponse = queue.findPreviousTurn(state.currentTurn);
      if (previousTurnResponse === null) {
        // Panic! at the disco
        return;
      }

      const { current, passed } = previousTurnResponse;

      state.currentTurn = current.id;

      // If we moved to the last element, we wrapped around, and we should remove a round
      if (current.isLastElement && state.round > 0) {
        state.round--;
      }

      state.effects = state.effects.map((effect) => {
        if (effect.type === 'lasting') {
          return effect;
        }

        const increaseProgress = passed.includes(effect.startedWith);

        if (!increaseProgress || !effect.initialRoundPassed) {
          return effect;
        }

        // If we forgot to delete the effect, make sure that we check how far past the duration we have moved before
        // activating the effect again.
        const actualProgress = effect.actualProgress === 0 ? 0 : effect.actualProgress - 1;

        return {
          ...effect,
          // If the actual progress is 0, do nothing
          progress:
            actualProgress === 0
              ? 0
              : // If the actual progress is greater than the duration, do nothing, otherwise use the actual progress
              actualProgress > effect.duration
              ? effect.duration
              : actualProgress,
          actualProgress: effect.actualProgress - 1,
          active: actualProgress <= effect.duration,
        };
      });
    },

    /**
     * Add or remove a condition for an entity.
     *
     * @param state
     * @param action
     */
    updateCondition(
      state,
      action: PayloadAction<{
        id: string;
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

    /**
     * Add a new effect, either that progresses or is static.
     *
     * @param state
     * @param action
     */
    addEffect(state, action: PayloadAction<AddEffectType>) {
      if (action.payload.type === 'progress') {
        state.effects.push({
          id: nanoid(),
          type: 'progress',
          name: action.payload.name,
          startedWith: action.payload.startedWith,
          active: true,
          initialRoundPassed: false,
          // Each round in combat takes 6 seconds. An effect lasting 60 seconds lasts for 10 rounds
          duration: Math.round(action.payload.duration / 6),
          progress: 0,
          actualProgress: 0,
          affected: [],
        });
      } else {
        state.effects.push({
          id: nanoid(),
          type: 'lasting',
          name: action.payload.name,
          active: true,
          affected: [],
        });
      }
    },

    /**
     * Delete an effect.
     *
     * @param state
     * @param action
     */
    deleteEffect(state, action: PayloadAction<string>) {
      state.effects = state.effects.filter((effect) => effect.id !== action.payload);
    },

    /**
     * Reset the total progress for an effect.
     *
     * @param state
     * @param action
     */
    resetEffect(state, action: PayloadAction<string>) {
      state.effects = state.effects.map((effect) => {
        if (effect.id !== action.payload) {
          return effect;
        }

        return {
          ...effect,
          startedWith: state.currentTurn,
          progress: 0,
          actualProgress: 0,
          initialRoundPassed: false,
        };
      });
    },

    /**
     * Override the effect progress.
     *
     * @param state
     * @param action
     */
    updateEffectProgress(state, action: PayloadAction<{ id: string; progress: number }>) {
      state.effects = state.effects.map((effect) => {
        if (effect.id !== action.payload.id || effect.type !== 'progress') {
          return effect;
        }

        return {
          ...effect,
          actualProgress: action.payload.progress,
          progress: action.payload.progress,
        };
      });
    },

    /**
     * Add or delete an entity as affected by an effect.
     *
     * @param state
     * @param action
     */
    addOrDeleteAffected(
      state,
      action: PayloadAction<{ id: string; affected: { id: string; name: string; enabled: boolean } }>,
    ) {
      state.effects = state.effects.map((effect) => {
        if (effect.id !== action.payload.id) {
          return effect;
        }

        if (action.payload.affected.enabled) {
          return {
            ...effect,
            affected: [...effect.affected, action.payload.affected.id],
          };
        }

        return {
          ...effect,
          affected: effect.affected.filter((affected) => affected !== action.payload.affected.id),
        };
      });
    },

    addNewMonster(state, action: PayloadAction<{ name: string; order: number; health: string }>) {
      const health = calculateHealth(action.payload.health);

      const newMonster = {
        id: nanoid(),
        name: action.payload.name,
        initiativeThrow: null,
        healthStart: health,
        healthCurrent: health,
        isPlayerCharacter: false,
        isSurprised: false,
        isDead: health <= 0,
        conditions: [],
      };

      state.entities = [
        ...state.entities.slice(0, action.payload.order - 1),
        newMonster,
        ...state.entities.slice(action.payload.order - 1),
      ];
    },
    setActiveConditionClicked(state, action: PayloadAction<Condition | null>) {
      state.clickedActiveCondition = action.payload;
    },
  },
});

export const {
  beginEncounter,
  updateHealth,
  nextRound,
  previousRound,
  updateCondition,
  addEffect,
  deleteEffect,
  resetEffect,
  updateEffectProgress,
  addOrDeleteAffected,
  addNewMonster,
  setActiveConditionClicked,
} = encounterPlayReducer.actions;

export default encounterPlayReducer.reducer;
