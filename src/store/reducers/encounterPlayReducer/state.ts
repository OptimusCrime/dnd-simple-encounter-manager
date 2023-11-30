import { getItem } from '../../../utilities/localStorage';
import { ReducerNames } from '../reducerNames';
import { Condition, EncounterPlayEffect, EncounterPlayEntity } from './types';

interface EncounterPlayState {
  name: string;
  round: number;
  currentTurn: string;
  entities: EncounterPlayEntity[];
  effects: EncounterPlayEffect[];
  clickedActiveCondition: Condition | null;
}

const fallbackInitialState: EncounterPlayState = {
  name: '',
  currentTurn: '',
  round: 1,
  entities: [],
  effects: [],
  clickedActiveCondition: null,
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
