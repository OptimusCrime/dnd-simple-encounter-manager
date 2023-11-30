import React from 'react';

import { SECONDS_PER_ROUND } from '../../../../constants';
import { useAppSelector } from '../../../../store/hooks';
import { EncounterPlayEffect, EncounterPlayEntity } from '../../../../store/reducers/encounterPlayReducer';
import { ReducerNames } from '../../../../store/reducers/reducerNames';

interface EffectInformationInformationProps {
  effect: EncounterPlayEffect;
}

const mapEffectStartedWithToEntityName = (startedWith: string, entities: EncounterPlayEntity[]): string => {
  const entity = entities.find((entity) => entity.id === startedWith);
  if (!entity) {
    return 'Unknown';
  }

  return entity.name;
};

export const EffectInformationBlock = (props: EffectInformationInformationProps) => {
  const { entities } = useAppSelector((state) => state[ReducerNames.ENCOUNTER_PLAY]);

  const { effect } = props;

  if (effect.type === 'progress') {
    const { active, progress, duration } = effect;

    const currentProgress = progress > duration ? duration : progress;
    const currentProgressInPercent = Math.round((progress / duration) * 100);

    return (
      <div className="flex flex-col space-y-2">
        <div className="flex flex-row justify-between">
          <div className="w-1/2">
            <strong>Active:</strong>&nbsp;{active ? 'Yes' : 'No'}
          </div>
          <div className="w-1/2">
            <strong>Progress:</strong>&nbsp;
            {`${currentProgress} / ${effect.duration} (${currentProgressInPercent}%)`}
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="w-1/2">
            <strong>Started with:</strong>&nbsp;{mapEffectStartedWithToEntityName(effect.startedWith, entities)}
          </div>
          <div className="w-1/2">
            <strong>Duration:</strong>&nbsp;{effect.duration * SECONDS_PER_ROUND}s
          </div>
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
