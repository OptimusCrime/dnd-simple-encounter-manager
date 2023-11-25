import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ReducerNames } from '../reducerNames';
import { getInitialState } from './state';

const charactersReducer = createSlice({
  name: ReducerNames.CHARACTERS,
  initialState: getInitialState(),
  reducers: {
    /**
     * Add a character to the system. Will automatically be added to encounters.
     *
     * @param state
     * @param action
     */
    addCharacter(state, action: PayloadAction<string>) {
      state.characters.push(action.payload);
    },

    /**
     * Remove a character from the system.
     *
     * @param state
     * @param action
     */
    removeCharacter(state, action: PayloadAction<string>) {
      state.characters = state.characters.filter((character) => character !== action.payload);
    },
  },
});

export const { addCharacter, removeCharacter } = charactersReducer.actions;

export default charactersReducer.reducer;
