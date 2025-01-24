import React from 'react';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { duplicateMonster, removeMonster, selectEncounter } from '../../../store/reducers/encountersReducer';
import { Page, setPage } from '../../../store/reducers/globalReducer';
import { ReducerNames } from '../../../store/reducers/reducerNames';

export const ListMonsters = () => {
  const { encounters, selectedEncounter } = useAppSelector((state) => state[ReducerNames.ENCOUNTERS]);
  const dispatch = useAppDispatch();

  const currentEncounter = encounters.find((encounter) => encounter.id === selectedEncounter);
  if (!currentEncounter) {
    dispatch(selectEncounter(null));
    dispatch(setPage(Page.ENCOUNTERS_LIST));

    // The fuck
    return <div></div>;
  }

  const { monsters } = currentEncounter;

  if (monsters.length === 0) {
    return <p className="prose-md">No monsters added.</p>;
  }

  return (
    <ul className="list-none p-0">
      {monsters.map((monster) => (
        <li key={monster.id} className="my-0">
          <div className="flex items-center">
            <button
              className="btn btn-sm btn-circle btn-outline btn-ghost my-0 mr-4"
              onClick={() => dispatch(removeMonster(monster.id))}
            >
              <svg
                className="w-5 h-5 fill-error hover:fill-base-100"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
              >
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
              </svg>
            </button>

            <button
              className="btn btn-sm btn-circle btn-outline btn-ghost my-0 mr-4"
              onClick={() => dispatch(duplicateMonster(monster.id))}
            >
              <svg
                className="w-5 h-5 fill-info hover:fill-base-100"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 256 256"
              >
                <path d="M184,64H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H184a8,8,0,0,0,8-8V72A8,8,0,0,0,184,64Zm-8,144H48V80H176ZM224,40V184a8,8,0,0,1-16,0V48H72a8,8,0,0,1,0-16H216A8,8,0,0,1,224,40Z"></path>
              </svg>
            </button>

            <span>{`${monster.name} (${monster.startHealth} HP - ${monster.startHealthExpression})`}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};
