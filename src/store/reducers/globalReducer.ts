import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ReducerNames } from './reducerNames';
import { getItem } from '../../utilities/localStorage';

export enum Page {
  ENCOUNTERS = 'encounters',
  ENCOUNTER_EDIT = 'encounter_edit',
  ENCOUNTER_PLAY = 'encounter_play',
  CHARACTERS = 'characters',
}

interface GlobalState {
  page: Page;
}

const fallbackInitialState: GlobalState = {
  page: Page.CHARACTERS,
};

const getInitialState = (): GlobalState => {
  const localStorage = getItem<GlobalState>(ReducerNames.GLOBAL);
  if (localStorage) {
    return {
      ...fallbackInitialState,
      ...localStorage,
    };
  }

  return fallbackInitialState;
};

const globalReducer = createSlice({
  name: ReducerNames.GLOBAL,
  initialState: getInitialState(),
  reducers: {
    setPage(state, action: PayloadAction<Page>) {
      state.page = action.payload;
    },
  },
});

export const { setPage } = globalReducer.actions;

export default globalReducer.reducer;
