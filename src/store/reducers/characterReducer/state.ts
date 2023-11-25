import { getItem } from '../../../utilities/localStorage';
import { ReducerNames } from '../reducerNames';

export interface CharactersState {
  characters: string[];
}

const fallbackInitialState: CharactersState = {
  characters: [],
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
