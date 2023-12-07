import cx from 'classnames';
import React from 'react';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  removeEncounter,
  selectEncounter,
  updateEncounterFinished,
  updateEncounterName,
  updateEncounterReady,
} from '../../../store/reducers/encountersReducer';
import { Page, setPage } from '../../../store/reducers/globalReducer';
import { ReducerNames } from '../../../store/reducers/reducerNames';

export const EncounterInformation = () => {
  const { encounters, selectedEncounter } = useAppSelector((state) => state[ReducerNames.ENCOUNTERS]);
  const dispatch = useAppDispatch();

  const encounterNameInputFieldRef = React.useRef<null | HTMLInputElement>(null);

  const currentEncounter = encounters.find((encounter) => encounter.id === selectedEncounter);
  if (!currentEncounter) {
    dispatch(selectEncounter(null));
    dispatch(setPage(Page.ENCOUNTERS_LIST));

    // The fuck
    return <div></div>;
  }

  const { name, finished, ready } = currentEncounter;

  const updateEncounterNameCallback = () => {
    if (encounterNameInputFieldRef?.current) {
      dispatch(updateEncounterName(encounterNameInputFieldRef.current.value));
    }
  };

  const startEncounterCallback = () => {
    if (currentEncounter) {
      dispatch(updateEncounterReady(true));
      dispatch(selectEncounter(currentEncounter.id));
      dispatch(setPage(Page.ENCOUNTER_INITIATIVE));
    }
  };

  const deleteEncounterCallback = () => {
    if (currentEncounter) {
      dispatch(removeEncounter(currentEncounter.id));
      dispatch(setPage(Page.ENCOUNTERS_LIST));
    }
  };

  return (
    <div className="flex flex-row items-end justify-between">
      <div className="flex flex-row">
        <div className="flex flex-row items-end">
          <div className="form-control w-full max-w-xs mr-4">
            <label className="label" htmlFor="encounter-name">
              <span className="label-text">Encounter name</span>
            </label>
            <input
              defaultValue={name}
              type="text"
              id="encounter-name"
              className="input input-bordered w-full max-w-xs"
              ref={encounterNameInputFieldRef}
              onKeyUp={(event) => {
                if (event.key.toLowerCase() === 'enter') {
                  updateEncounterNameCallback();
                }
              }}
            />
          </div>
          <button className="btn bg-base-100" onClick={updateEncounterNameCallback}>
            Update name
          </button>
        </div>
        <div className="flex flex-row items-end ml-16">
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text text-lg mr-4">Ready</span>
              <input
                type="checkbox"
                className={cx('toggle', ready ? 'toggle-success' : '')}
                defaultChecked={ready}
                onChange={(event) => {
                  dispatch(updateEncounterReady(event.target.checked));
                }}
              />
            </label>
          </div>
        </div>
        <div className="flex flex-row items-end ml-16">
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text text-lg mr-4">Finished</span>
              <input
                type="checkbox"
                className={cx('toggle', finished ? 'toggle-success' : '')}
                defaultChecked={finished}
                onChange={(event) => {
                  dispatch(updateEncounterFinished(event.target.checked));
                }}
              />
            </label>
          </div>
        </div>
        <div className="flex flex-row items-end ml-16">
          <button className="btn btn-error" onClick={deleteEncounterCallback}>
            Delete
          </button>
        </div>
      </div>
      <div>
        <button className="btn btn-success" onClick={startEncounterCallback}>
          Start
        </button>
      </div>
    </div>
  );
};
