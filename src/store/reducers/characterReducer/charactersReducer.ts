import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

import { ReducerNames } from '../reducerNames';
import { getInitialState } from './state';

const charactersReducer = createSlice({
  name: ReducerNames.CHARACTERS,
  initialState: getInitialState(),
  reducers: {
    /**
     * Adds a new set of characters to the system.
     *
     * @param state
     * @param action
     */
    addCharacterSet(state, action: PayloadAction<string>) {
      state.sets.push({
        id: nanoid(),
        name: action.payload,
        characters: [],
      });
    },

    /**
     * Removes a set of characters.
     *
     * @param state
     * @param action
     */
    removeCharacterSet(state, action: PayloadAction<string>) {
      state.sets = state.sets.filter((set) => set.id !== action.payload);
    },

    /**
     * Add a character to the system. Will automatically be added to encounters.
     *
     * @param state
     * @param action
     */
    addCharacter(state, action: PayloadAction<{ set: string; character: string }>) {
      state.sets = state.sets.map((set) => {
        if (set.id !== action.payload.set) {
          return set;
        }

        return {
          ...set,
          characters: [...set.characters, action.payload.character],
        };
      });
    },

    /**
     * Remove a character from the system.
     *
     * @param state
     * @param action
     */
    removeCharacter(state, action: PayloadAction<{ set: string; character: string }>) {
      state.sets = state.sets.map((set) => {
        if (set.id !== action.payload.set) {
          return set;
        }

        return {
          ...set,
          characters: set.characters.filter((character) => character !== action.payload.character),
        };
      });
    },
  },
});

export const { addCharacterSet, removeCharacterSet, addCharacter, removeCharacter } = charactersReducer.actions;

export default charactersReducer.reducer;
