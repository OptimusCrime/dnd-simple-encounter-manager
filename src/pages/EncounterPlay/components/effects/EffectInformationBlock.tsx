import React from 'react';

import { EncounterPlayEffect } from '../../../../store/reducers/encounterPlayReducer';

interface EffectInformationInformationProps {
  effect: EncounterPlayEffect;
}
export const EffectInformationBlock = (props: EffectInformationInformationProps) => {
  const { effect } = props;

  if (effect.type === 'progress') {
    const { active, progress, duration } = effect;

    const currentProgress = progress > duration ? duration : progress;
    const currentProgressInPercent = Math.round((progress / duration) * 100);

    return (
      <div className="flex flex-row justify-between">
        <div>
          <strong>Active:</strong>&nbsp;{active ? 'Yes' : 'No'}
        </div>
        <div>
          <strong>Progress:</strong>&nbsp;
          {`${currentProgress} / ${effect.duration} (${currentProgressInPercent}%)`}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row">
      <p>
        <strong>Progress:</strong>&nbsp;Lasting
      </p>
    </div>
  );
};
