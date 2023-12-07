import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

import { ReducerNames } from '../reducerNames';
import { mapNewMonster } from './mappers';
import { AddMonsterPayload } from './reducerTypes';
import { getInitialState } from './state';

const encountersReducer = createSlice({
  name: ReducerNames.ENCOUNTERS,
  initialState: getInitialState(),
  reducers: {
    /**
     * Add a new encounter with nothing but a name.
     *
     * @param state
     * @param action
     */
    addEncounter(state, action: PayloadAction<string>) {
      state.encounters.push({
        id: nanoid(),
        name: action.payload,
        ready: false,
        finished: false,
        monsters: [],
      });
    },

    /**
     * Remove an encounter.
     *
     * @param state
     * @param action
     */
    removeEncounter(state, action: PayloadAction<string>) {
      state.encounters = state.encounters.filter((encounter) => encounter.id !== action.payload);
    },

    /**
     * Select an encounter.
     *
     * @param state
     * @param action
     */
    selectEncounter(state, action: PayloadAction<string | null>) {
      state.selectedEncounter = action.payload;
    },

    /**
     * Update the encounter name.
     *
     * @param state
     * @param action
     */
    updateEncounterName(state, action: PayloadAction<string>) {
      state.encounters = state.encounters.map((encounter) => {
        if (state.selectedEncounter !== encounter.id) {
          return encounter;
        }

        return {
          ...encounter,
          name: action.payload,
        };
      });
    },

    /**
     * Set the encounter as finished to push it down in the listing.
     *
     * @param state
     * @param action
     */
    updateEncounterFinished(state, action: PayloadAction<boolean>) {
      state.encounters = state.encounters.map((encounter) => {
        if (state.selectedEncounter !== encounter.id) {
          return encounter;
        }

        return {
          ...encounter,
          finished: action.payload,
          // Reset ready if encounter is finished
          ready: action.payload ? false : action.payload,
        };
      });
    },

    /**
     * Mark an encounter as ready for play.
     *
     * @param state
     * @param action
     */
    updateEncounterReady(state, action: PayloadAction<boolean>) {
      state.encounters = state.encounters.map((encounter) => {
        if (state.selectedEncounter !== encounter.id) {
          return encounter;
        }

        return {
          ...encounter,
          ready: action.payload,
        };
      });
    },

    /**
     * Add a monster to the encounter.
     *
     * @param state
     * @param action
     */
    addMonster(state, action: PayloadAction<AddMonsterPayload>) {
      state.encounters = state.encounters.map((encounter) => {
        if (state.selectedEncounter !== encounter.id) {
          return encounter;
        }

        return {
          ...encounter,
          monsters: [...encounter.monsters, ...mapNewMonster(action.payload)],
        };
      });
    },

    /**
     * Remove a monster from the encounter.
     *
     * @param state
     * @param action
     */
    removeMonster(state, action: PayloadAction<string>) {
      state.encounters = state.encounters.map((encounter) => {
        if (state.selectedEncounter !== encounter.id) {
          return encounter;
        }

        return {
          ...encounter,
          monsters: encounter.monsters.filter((monster) => monster.id !== action.payload),
        };
      });
    },
  },
});

export const {
  addEncounter,
  removeEncounter,
  selectEncounter,

  updateEncounterName,
  updateEncounterFinished,
  updateEncounterReady,

  addMonster,
  removeMonster,
} = encountersReducer.actions;

export default encountersReducer.reducer;
