import { getItem } from '../../../utilities/localStorage';
import { ReducerNames } from '../reducerNames';
import { Encounter } from './types';

interface EncountersState {
  selectedEncounter: null | string;
  encounters: Encounter[];
}

const fallbackInitialState: EncountersState = {
  selectedEncounter: null,
  encounters: [],
};

export const getInitialState = (): EncountersState => {
  const localStorage = getItem<EncountersState>(ReducerNames.ENCOUNTERS);
  if (localStorage) {
    return {
      ...fallbackInitialState,
      ...localStorage,
    };
  }

  return fallbackInitialState;
};
