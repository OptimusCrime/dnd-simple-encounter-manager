import { createListenerMiddleware } from '@reduxjs/toolkit'

import {ReducerNames} from "./reducers/reducerNames";
import {setItem} from "../utilities/localStorage";

export const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  predicate: (_, __, ___) => {
    // Lol
    return true;
  },
  effect: (action, listenerApi) => {
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
})
