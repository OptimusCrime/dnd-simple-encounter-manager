import React from 'react';

import { Heading } from '../../components';
import { useAppSelector } from '../../store/hooks';
import { ReducerNames } from '../../store/reducers/reducerNames';
import { EffectsPanel, Entity, LogPanel, SideControlsPanel } from './components';
import { EncounterTimer } from './components/EncounterTimer';

export const EncounterPlay = () => {
  const { entities, currentTurn, round, name } = useAppSelector((state) => state[ReducerNames.ENCOUNTER_PLAY]);

  const { effects } = useAppSelector((state) => state[ReducerNames.ENCOUNTER_PLAY]);

  return (
    <div>
      <div className="flex flex-row items-center">
        <Heading text={`${name} [round: ${round + 1}]`} />
        <div className="pl-4">
          <EncounterTimer />
        </div>
      </div>
      <div className="flex flex-row space-x-8">
        <div className="w-4/6 flex flex-col space-y-6">
          {entities.map((entity) => (
            <Entity key={entity.id} entity={entity} currentTurn={currentTurn} effects={effects} />
          ))}
        </div>
        <div className="w-2/6">
          <div className="flex flex-col space-y-8">
            <SideControlsPanel />
            <LogPanel />
            <EffectsPanel />
          </div>
        </div>
      </div>
    </div>
  );
};
