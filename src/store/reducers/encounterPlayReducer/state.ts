import { getItem } from '../../../utilities/localStorage';
import { ReducerNames } from '../reducerNames';
import { Condition, EncounterPlayEffect, EncounterPlayEntity, LogMessage } from './types';

interface EncounterPlayState {
  turnStart: number;
  name: string;
  round: number;
  currentTurn: string;
  entities: EncounterPlayEntity[];
  effects: EncounterPlayEffect[];
  clickedActiveCondition: Condition | null;
  logs: LogMessage[];
}

const fallbackInitialState: EncounterPlayState = {
  turnStart: 0,
  name: '',
  currentTurn: '',
  round: 1,
  entities: [],
  effects: [],
  clickedActiveCondition: null,
  logs: [],
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
