import React from 'react';

import { Heading } from '../../components';
import { useAppSelector } from '../../store/hooks';
import { ReducerNames } from '../../store/reducers/reducerNames';
import { EffectsPanel, Entity, SideControlsPanel } from './components';

export const EncounterPlay = () => {
  const { entities, currentTurn, round, name } = useAppSelector((state) => state[ReducerNames.ENCOUNTER_PLAY]);

  return (
    <div>
      <Heading text={`${name} [round: ${round + 1}]`} />
      <div className="flex flex-row space-x-8">
        <div className="w-4/6 flex flex-col space-y-4">
          {entities.map((entity, index) => (
            <Entity key={entity.id} index={index} entity={entity} currentTurn={currentTurn} />
          ))}
        </div>
        <div className="w-2/6">
          <div className="flex flex-col space-y-8">
            <SideControlsPanel />
            <EffectsPanel />
          </div>
        </div>
      </div>
    </div>
  );
};
