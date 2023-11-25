import React from 'react';

import { Heading } from '../../components';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectEncounter } from '../../store/reducers/encountersReducer';
import { Page, setPage } from '../../store/reducers/globalReducer';
import { ReducerNames } from '../../store/reducers/reducerNames';
import { AddMonster, EncounterInformation, ListMonsters } from './components';

export const EncounterEdit = () => {
  const { encounters, selectedEncounter } = useAppSelector((state) => state[ReducerNames.ENCOUNTERS]);
  const dispatch = useAppDispatch();

  const currentEncounter = encounters.find((encounter) => encounter.id === selectedEncounter);
  if (!currentEncounter) {
    dispatch(selectEncounter(null));
    dispatch(setPage(Page.ENCOUNTERS_LIST));

    // The fuck
    return <div></div>;
  }

  const { name, monsters } = currentEncounter;

  return (
    <div>
      <div>
        <Heading text={`Encounter: ${name}`} />
        <div className="card bg-neutral text-neutral-content card-compact">
          <div className="card-body">
            <EncounterInformation />
          </div>
        </div>
      </div>
      <div className="mt-8">
        <Heading text={`Monsters (${monsters.length})`} />
        <div className="card bg-neutral text-neutral-content card-compact">
          <div className="card-body prose">
            <ListMonsters />
          </div>
          <div className="card-body">
            <AddMonster />
          </div>
        </div>
      </div>
    </div>
  );
};
