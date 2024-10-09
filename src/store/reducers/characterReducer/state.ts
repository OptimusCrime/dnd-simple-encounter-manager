import { getItem } from '../../../utilities/localStorage';
import { ReducerNames } from '../reducerNames';
import { CharacterSet } from './types';

export interface CharactersState {
  selectedSet: string | null;
  sets: CharacterSet[];
}

const fallbackInitialState: CharactersState = {
  selectedSet: null,
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
