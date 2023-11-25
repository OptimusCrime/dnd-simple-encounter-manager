import { configureStore } from '@reduxjs/toolkit';

import { listenerMiddleware } from './listenerMiddleware';
import charactersReducer from './reducers/characterReducer/charactersReducer';
import encounterPlayReducer from './reducers/encounterPlayReducer/encounterPlayReducer';
import encountersReducer from './reducers/encountersReducer/encountersReducer';
import globalReducer from './reducers/globalReducer/globalReducer';
import { ReducerNames } from './reducers/reducerNames';

export const store = configureStore({
  reducer: {
    [ReducerNames.GLOBAL]: globalReducer,
    [ReducerNames.CHARACTERS]: charactersReducer,
    [ReducerNames.ENCOUNTERS]: encountersReducer,
    [ReducerNames.ENCOUNTER_PLAY]: encounterPlayReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
