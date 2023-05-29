import React from 'react';
import { Encounter, selectEncounter } from '../../../store/reducers/encountersReducer';
import { setPlayEncounter } from '../../../store/reducers/encounterPlayReducer';
import { Page, setPage } from '../../../store/reducers/globalReducer';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { ReducerNames } from '../../../store/reducers/reducerNames';

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
  const dispatch = useAppDispatch();

  if (encounters.length === 0) {
    return <p className="prose-md">No characters added.</p>;
  }

  const sortedEncounters = sortEncounters(encounters);

  return (
    <ul className="list-none p-0">
      {sortedEncounters.map((encounter) => (
        <li key={encounter.id} className="my-0">
          <div className="flex items-center">
            <button
              className={`btn btn-sm btn-circle btn-outline btn-ghost my-0 mr-4 ${
                encounter.ready ? 'btn-success' : 'btn-disabled'
              }`}
              onClick={() => {
                if (encounter.ready) {
                  dispatch(setPlayEncounter(encounter));
                  dispatch(setPage(Page.ENCOUNTER_PLAY_INITIATIVE));
                }
              }}
            >
              <svg
                className={`w-5 h-5 ${encounter.ready ? 'fill-success' : 'fill-base-100'} hover:fill-base-100`}
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.5 16.5v-9l7 4.5-7 4.5z" />
              </svg>
            </button>
            <span
              className={`link hover:no-underline ${encounter.finished ? 'line-through' : ''}`}
              onClick={() => {
                dispatch(selectEncounter(encounter.id));
                dispatch(setPage(Page.ENCOUNTER_EDIT));
              }}
            >
              {`${encounter.name} (${
                encounter.entities.filter((entity) => !entity.isPlayerCharacter).length
              } monsters)`}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};
