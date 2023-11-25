import { getItem } from '../../../utilities/localStorage';
import { ReducerNames } from '../reducerNames';
import { Page } from './types';

export interface GlobalState {
  page: Page;
}

const fallbackInitialState: GlobalState = {
  page: Page.CHARACTERS,
};

export const getInitialState = (): GlobalState => {
  const localStorage = getItem<GlobalState>(ReducerNames.GLOBAL);
  if (localStorage) {
    return {
      ...fallbackInitialState,
      ...localStorage,
    };
  }

  return fallbackInitialState;
};
