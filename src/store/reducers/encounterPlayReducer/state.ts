import { getItem } from '../../../utilities/localStorage';
import { ReducerNames } from '../reducerNames';
import { EncounterPlayEffect, EncounterPlayEntity } from './types';

interface EncounterPlayState {
  name: string;
  round: number;
  currentTurn: string;
  entities: EncounterPlayEntity[];
  effects: EncounterPlayEffect[];
}

const fallbackInitialState: EncounterPlayState = {
  name: '',
  currentTurn: '',
  round: 1,
  entities: [],
  effects: [],
};

export const getInitialState = (): EncounterPlayState => {
  const localStorage = getItem<EncounterPlayState>(ReducerNames.ENCOUNTER_PLAY);
  if (localStorage) {
    return {
      ...fallbackInitialState,
      ...localStorage,
    };
  }

  return fallbackInitialState;
};
