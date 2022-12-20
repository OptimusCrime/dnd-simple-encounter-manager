import { ReducerNames } from '../store/reducers/reducerNames';

const createStateKey = (key: CacheKeys): string => `state_${key}`;

type CacheKeys = ReducerNames;

export const setItem = (key: CacheKeys, payload: object) => {
  if (!window.localStorage) {
    // What to do? Don't know.
  }

  window.localStorage.setItem(createStateKey(key), JSON.stringify(payload));
};

export const deleteKey = (key: CacheKeys) => {
  if (!window.localStorage) {
    // What to do? Don't know.
  }

  window.localStorage.removeItem(createStateKey(key));
};

export const getItem = <T>(key: CacheKeys): T | null => {
  if (!window.localStorage) {
    return null;
  }

  const content = window.localStorage.getItem(createStateKey(key));

  if (content === null) {
    return null;
  }

  return JSON.parse(content) as T;
};
