import React, { useEffect, useState } from 'react';

import { useAppSelector } from '../../../store/hooks';
import { ReducerNames } from '../../../store/reducers/reducerNames';
import { addLeadingZero } from '../../../utilities/numberHelpers';

const calculateTimerValue = (ts: number): string => {
  const diff = Date.now() - ts;
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return `${addLeadingZero(minutes)}:${addLeadingZero(seconds)}`;
};

export const EncounterTimer = () => {
  const { turnStart, encounterStart } = useAppSelector((state) => state[ReducerNames.ENCOUNTER_PLAY]);

  const [encounterTimer, setEncounterTimer] = useState<string>(calculateTimerValue(encounterStart));
  const [turnTimer, setTurnTimer] = useState<string>(calculateTimerValue(turnStart));

  const updateCounter = () => {
    setTurnTimer(calculateTimerValue(turnStart));
    setEncounterTimer(calculateTimerValue(encounterStart));
  };

  useEffect(() => {
    const interval = setInterval(() => updateCounter(), 200);

    return () => clearInterval(interval);
  }, [turnStart]);

  return (
    <div>
      Turn: {turnTimer} / Encounter: {encounterTimer}
    </div>
  );
};
