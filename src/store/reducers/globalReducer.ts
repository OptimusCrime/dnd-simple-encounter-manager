import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getItem } from '../../utilities/localStorage';
import { ReducerNames } from './reducerNames';

export enum Page {
  ENCOUNTERS = 'encounters',
  ENCOUNTER_EDIT = 'encounter_edit',
  ENCOUNTER_PLAY_INITIATIVE = 'encounter_play_initiative',
  ENCOUNTER_PLAY_COMBAT = 'encounter_play_combat',
  CHARACTERS = 'characters',
  SETTINGS = 'settings',
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
