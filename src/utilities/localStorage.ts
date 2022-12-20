const createStateKey = (key: string): string => `state_${key}`;

export const setItem = (key: string, payload: object) => {
  if (!window.localStorage) {
    // What to do? Don't know.
  }

  window.localStorage.setItem(createStateKey(key), JSON.stringify(payload));
};

export const getItem = <T>(key: string): T | null => {
  if (!window.localStorage) {
    return null;
  }

  const content = window.localStorage.getItem(createStateKey(key));

  if (content === null) {
    return null;
  }

  return JSON.parse(content) as T;
};
