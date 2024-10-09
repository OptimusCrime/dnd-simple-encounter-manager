import React from 'react';

import { useAppSelector } from '../../../../store/hooks';
import { EncounterPlayEffect, EncounterPlayEntity } from '../../../../store/reducers/encounterPlayReducer';
import { ReducerNames } from '../../../../store/reducers/reducerNames';
import { EffectButtonsPanel } from './EffectButtonsPanel';
import { EffectInformationBlock } from './EffectInformationBlock';
import { EffectsProgressBar } from './progressBar';

interface EffectListItemProps {
  effect: EncounterPlayEffect;
}

const mapAffectedEntities = (affected: string[], entities: EncounterPlayEntity[]): string[] => {
  if (affected.length === 0) {
    return [];
  }

  const affectedEntities = [];
  for (const value of affected) {
    const entity = entities.find((entity) => entity.id === value);
    if (!entity) {
      continue;
    }

    affectedEntities.push(`${entity.name} (${entity.number})`);
  }

  return affectedEntities;
};

export const EffectListItem = (props: EffectListItemProps) => {
  const { effect } = props;

  const { entities } = useAppSelector((state) => state[ReducerNames.ENCOUNTER_PLAY]);

  const affectedEntities = mapAffectedEntities(effect.affected, entities);

  return (
    <div className="card bg-neutral text-neutral-content card-compact">
      <div className="card-body">
        <div className="flex flex-col">
          <h4 className="text-xl p-0 m-0">{effect.name}</h4>
          <div className="flex flex-col space-y-2 pt-4">
            <div className="flex flex-col space-y-4 prose">
              <EffectInformationBlock effect={effect} />
              <div>
                <strong>Affected:</strong>
                &nbsp;
                {affectedEntities.length === 0 ? 'Nobody' : affectedEntities.join(', ')}
              </div>
            </div>
            <div className="pt-2">
              <EffectsProgressBar effect={effect} />
            </div>
            <div className="pt-2">
              <EffectButtonsPanel effect={effect} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
