import React, { useEffect, useState } from 'react';

import { useAppSelector } from '../../../store/hooks';
import { ReducerNames } from '../../../store/reducers/reducerNames';
import { addLeadingZero } from '../../../utilities/numberHelpers';

export const TurnCounter = () => {
  const { turnStart } = useAppSelector((state) => state[ReducerNames.ENCOUNTER_PLAY]);

  const [timer, setTimer] = useState<string | null>(null);

  const updateCounter = () => {
    const diff = Date.now() - turnStart;

    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    setTimer(`${addLeadingZero(minutes)}:${addLeadingZero(seconds)}`);
  };

  useEffect(() => {
    const interval = setInterval(() => updateCounter(), 200);

    return () => clearInterval(interval);
  }, [turnStart]);

  if (timer === null) {
    return null;
  }

  return <div>Current turn: {timer}</div>;
};
