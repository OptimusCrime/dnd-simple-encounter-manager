import { createListenerMiddleware } from '@reduxjs/toolkit';

import { setItem } from '../utilities/localStorage';
import { ReducerNames } from './reducers/reducerNames';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  predicate: (_, __, ___) => {
    // Lol
    return true;
  },
  effect: (_action, listenerApi) => {
    const state = listenerApi.getState();

    // The key in the global state is the name of the reducer
    const reducerNameValues = Object.values(ReducerNames);
    for (const reducerName of reducerNameValues) {
      // @ts-ignore
      if (reducerName in state) {
        // @ts-ignore
        setItem(reducerName, state[reducerName]);
      }
    }
  },
});
