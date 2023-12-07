import { getItem } from '../../../utilities/localStorage';
import { ReducerNames } from '../reducerNames';
import { CharacterSet } from './types';

export interface CharactersState {
  sets: CharacterSet[];
}

const fallbackInitialState: CharactersState = {
  sets: [],
};

export const getInitialState = (): CharactersState => {
  const localStorage = getItem<CharactersState>(ReducerNames.CHARACTERS);
  if (localStorage) {
    return {
      ...fallbackInitialState,
      ...localStorage,
    };
  }

  return fallbackInitialState;
};
