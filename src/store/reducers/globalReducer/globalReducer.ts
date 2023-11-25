import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ReducerNames } from '../reducerNames';
import { getInitialState } from './state';
import { Page } from './types';

const globalReducer = createSlice({
  name: ReducerNames.GLOBAL,
  initialState: getInitialState(),
  reducers: {
    /**
     * Sets the current page (SPA bbyy, or something like that...)
     * @param state
     * @param action
     */
    setPage(state, action: PayloadAction<Page>) {
      state.page = action.payload;
    },
  },
});

export const { setPage } = globalReducer.actions;

export default globalReducer.reducer;
