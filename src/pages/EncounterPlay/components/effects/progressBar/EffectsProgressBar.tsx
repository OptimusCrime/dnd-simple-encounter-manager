import React from 'react';

import { useAppDispatch } from '../../../../../store/hooks';
import { EncounterPlayEffect, updateEffectProgress } from '../../../../../store/reducers/encounterPlayReducer';
import { EffectsProgressbarBox } from './EffectsProgressBarBox';

interface EffectsProgressbarProps {
  effect: EncounterPlayEffect;
}

export const EffectsProgressBar = (props: EffectsProgressbarProps) => {
  const dispatch = useAppDispatch();

  const { effect } = props;

  const onClick = (index: number) => {
    dispatch(
      updateEffectProgress({
        id: effect.id,
        progress: index + 1,
      }),
    );
  };

  if (effect.type !== 'progress') {
    return null;
  }

  const current = effect.progress > effect.duration ? effect.duration : effect.progress;
  const max = effect.duration;

  const boxes = Array.from(Array(max)).map((_value, index) => (index < current ? 1 : 0));
  const size = 100 / max;

  return (
    <div className="flex flex-row">
      {boxes.map((box, index) => (
        <EffectsProgressbarBox onClick={() => onClick(index)} key={index} index={index} box={box} size={size} />
      ))}
    </div>
  );
};
