import { Container } from '@mui/material';
import React from 'react';

import { Header } from './layout/Header';
import { Characters } from './pages/Characters';
import { EncounterEdit } from './pages/EncounterEdit';
import { EncounterPlay } from './pages/EncounterPlay';
import { Encounters } from './pages/Encounters';
import {Settings} from "./pages/Settings";
import { useAppSelector } from './store/hooks';
import { Page } from './store/reducers/globalReducer';
import { ReducerNames } from './store/reducers/reducerNames';

const Content = () => {
  const { page } = useAppSelector((state) => state[ReducerNames.GLOBAL]);

  switch (page) {
    case Page.ENCOUNTERS:
      return <Encounters />;
    case Page.ENCOUNTER_EDIT:
      return <EncounterEdit />;
    case Page.ENCOUNTER_PLAY:
      return <EncounterPlay />;
    case Page.SETTINGS:
      return <Settings />;
    case Page.CHARACTERS:
    default:
      return <Characters />;
  }
};

export const App = () => {
  return (
    <div className="App">
      <Header />
      <Container
        sx={{
          mt: '2rem',
        }}
      >
        <Content />
      </Container>
    </div>
  );
};
