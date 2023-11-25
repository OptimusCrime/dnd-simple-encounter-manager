import React from 'react';

import { useAppSelector } from '../../../store/hooks';
import { Encounter } from '../../../store/reducers/encountersReducer';
import { ReducerNames } from '../../../store/reducers/reducerNames';
import { EncounterListItem } from './EncounterListItem';

const sortEncounters = (encounters: Encounter[]): Encounter[] =>
  encounters.slice().sort((a, b) => {
    if (a.finished) {
      return 1;
    }
    if (b.finished) {
      return -1;
    }

    if (a.ready) {
      return -1;
    }
    if (b.ready) {
      return 1;
    }

    return 0;
  });

export const ListEncounters = () => {
  const { encounters } = useAppSelector((state) => state[ReducerNames.ENCOUNTERS]);

  if (encounters.length === 0) {
    return <p className="prose-md">No characters added.</p>;
  }

  const sortedEncounters = sortEncounters(encounters);

  return (
    <ul className="list-none p-0">
      {sortedEncounters.map((encounter) => (
        <EncounterListItem key={encounter.id} encounter={encounter} />
      ))}
    </ul>
  );
};
