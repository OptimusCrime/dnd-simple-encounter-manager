import cx from 'classnames';
import React from 'react';

import { useAppDispatch } from '../../../store/hooks';
import { Encounter, selectEncounter } from '../../../store/reducers/encountersReducer';
import { Page, setPage } from '../../../store/reducers/globalReducer';

interface EncounterListItemProps {
  encounter: Encounter;
}

export const EncounterListItem = (props: EncounterListItemProps) => {
  const dispatch = useAppDispatch();

  const { encounter } = props;

  const playEncounterClassName = encounter.ready ? 'btn-success' : 'btn-disabled';
  const playEncounterIconClassName = encounter.ready ? 'fill-success' : 'fill-base-100';
  const playEncounterTextClassName = encounter.finished ? 'line-through' : '';

  return (
    <li className="my-0">
      <div className="flex items-center">
        <button
          className={cx('btn btn-sm btn-circle btn-outline btn-ghost my-0 mr-4', playEncounterClassName)}
          onClick={() => {
            if (encounter.ready) {
              dispatch(selectEncounter(encounter.id));
              dispatch(setPage(Page.ENCOUNTER_INITIATIVE));
            }
          }}
        >
          <svg
            className={cx('w-5 h-5 hover:fill-base-100', playEncounterIconClassName)}
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.5 16.5v-9l7 4.5-7 4.5z" />
          </svg>
        </button>
        <span
          className={cx('link hover:no-underline', playEncounterTextClassName)}
          onClick={() => {
            dispatch(selectEncounter(encounter.id));
            dispatch(setPage(Page.ENCOUNTER_EDIT));
          }}
        >
          {`${encounter.name} (${encounter.monsters.length} monsters)`}
        </span>
      </div>
    </li>
  );
};
