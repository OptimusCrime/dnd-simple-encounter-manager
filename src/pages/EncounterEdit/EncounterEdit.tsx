import React from 'react';

import { Content } from '../../layout/Content';
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
    dispatch(setPage(Page.ENCOUNTERS));

    // The fuck
    return <div></div>;
  }

  const { name, entities } = currentEncounter;

  const monsters = entities.filter((entity) => !entity.isPlayerCharacter);

  return (
    <>
      <Content title={`Encounter: ${name}`}>
        <div className="card bg-neutral text-neutral-content card-compact">
          <div className="card-body">
            <EncounterInformation />
          </div>
        </div>
      </Content>
      <Content title={`Monsters (${monsters.length})`} className="mt-8">
        <div className="card bg-neutral text-neutral-content card-compact">
          <div className="card-body prose">
            <ListMonsters />
          </div>
          <div className="card-body">
            <AddMonster />
          </div>
        </div>
      </Content>
    </>
  );
};
