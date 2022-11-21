import { configureStore } from '@reduxjs/toolkit';

import {listenerMiddleware} from "./listenerMiddleware";
import {ReducerNames} from "./reducers/reducerNames";
import globalReducer from "./reducers/globalReducer";
import charactersReducer from "./reducers/charactersReducer";
import encountersReducer from "./reducers/encountersReducer";
import encounterPlayReducer from "./reducers/encounterPlayReducer";

export const store = configureStore({
  reducer: {
    [ReducerNames.GLOBAL]: globalReducer,
    [ReducerNames.CHARACTERS]: charactersReducer,
    [ReducerNames.ENCOUNTERS]: encountersReducer,
    [ReducerNames.ENCOUNTER_PLAY]: encounterPlayReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
