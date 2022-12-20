import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getItem } from '../../utilities/localStorage';
import { ReducerNames } from './reducerNames';

interface CharactersState {
  characters: string[];
}

const fallbackInitialState: CharactersState = {
  characters: [],
};

const getInitialState = (): CharactersState => {
  const localStorage = getItem<CharactersState>(ReducerNames.CHARACTERS);
  if (localStorage) {
    return {
      ...fallbackInitialState,
      ...localStorage,
    };
  }

  return fallbackInitialState;
};

const charactersReducer = createSlice({
  name: ReducerNames.CHARACTERS,
  initialState: getInitialState(),
  reducers: {
    addCharacter(state, action: PayloadAction<string>) {
      state.characters.push(action.payload);
    },
    removeCharacter(state, action: PayloadAction<string>) {
      state.characters = state.characters.filter((character) => character !== action.payload);
    },
  },
});

export const { addCharacter, removeCharacter } = charactersReducer.actions;

export default charactersReducer.reducer;
