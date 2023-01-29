import React from 'react';

import { MultiColumnWrapper, OneColumnWrapper } from './layout/Wrappers';
import { Characters } from './pages/Characters';
import { EncounterEdit } from './pages/EncounterEdit';
import { EncounterPlayCombat } from './pages/EncounterPlayCombat';
import { EncounterPlayInitiative } from './pages/EncounterPlayInitiative';
import { Encounters } from './pages/Encounters';
import { Settings } from './pages/Settings';
import { useAppSelector } from './store/hooks';
import { Page } from './store/reducers/globalReducer';
import { ReducerNames } from './store/reducers/reducerNames';

export const App = () => {
  const { page } = useAppSelector((state) => state[ReducerNames.GLOBAL]);

  switch (page) {
    case Page.ENCOUNTERS:
      return (
        <OneColumnWrapper>
          <Encounters />
        </OneColumnWrapper>
      );
    case Page.ENCOUNTER_EDIT:
      return (
        <OneColumnWrapper>
          <EncounterEdit />
        </OneColumnWrapper>
      );
    case Page.ENCOUNTER_PLAY_INITIATIVE:
      return (
        <OneColumnWrapper>
          <EncounterPlayInitiative />
        </OneColumnWrapper>
      );
    case Page.ENCOUNTER_PLAY_COMBAT:
      return (
        <MultiColumnWrapper>
          <EncounterPlayCombat />
        </MultiColumnWrapper>
      );
    case Page.SETTINGS:
      return (
        <OneColumnWrapper>
          <Settings />
        </OneColumnWrapper>
      );
    case Page.CHARACTERS:
    default:
      return (
        <OneColumnWrapper>
          <Characters />
        </OneColumnWrapper>
      );
  }
};
