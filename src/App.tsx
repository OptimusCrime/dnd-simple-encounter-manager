import React from 'react';

import { Characters, EncounterEdit, EncounterInitiative, EncounterPlay, EncountersList, Settings } from './pages';
import { useAppSelector } from './store/hooks';
import { Page } from './store/reducers/globalReducer';
import { ReducerNames } from './store/reducers/reducerNames';

export const App = () => {
  const { page } = useAppSelector((state) => state[ReducerNames.GLOBAL]);

  switch (page) {
    case Page.ENCOUNTERS_LIST:
      return <EncountersList />;
    case Page.ENCOUNTER_EDIT:
      return <EncounterEdit />;
    case Page.ENCOUNTER_INITIATIVE:
      return <EncounterInitiative />;
    case Page.ENCOUNTER_COMBAT:
      return <EncounterPlay />;
    case Page.SETTINGS:
      return <Settings />;
    case Page.CHARACTERS:
    default:
      return <Characters />;
  }
};
