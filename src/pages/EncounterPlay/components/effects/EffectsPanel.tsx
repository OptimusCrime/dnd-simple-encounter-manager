import React from 'react';

import { useAppSelector } from '../../../../store/hooks';
import { ReducerNames } from '../../../../store/reducers/reducerNames';
import { EffectListItem } from './EffectListItem';
import { EffectsPanelWrapper } from './EffectsPanelWrapper';

export const EffectsPanel = () => {
  const { effects } = useAppSelector((state) => state[ReducerNames.ENCOUNTER_PLAY]);

  if (effects.length === 0) {
    return (
      <EffectsPanelWrapper>
        <div className="card bg-neutral text-neutral-content card-compact">
          <div className="card-body prose">
            <p>No active effects</p>
          </div>
        </div>
      </EffectsPanelWrapper>
    );
  }

  return (
    <EffectsPanelWrapper>
      <div className="flex flex-col space-y-4">
        {effects.map((effect) => (
          <EffectListItem key={effect.id} effect={effect} />
        ))}
      </div>
    </EffectsPanelWrapper>
  );
};
