import React from 'react';

import { useAppDispatch } from '../../../store/hooks';
import { addEncounter } from '../../../store/reducers/encountersReducer';

export const NewEncounter = () => {
  const dispatch = useAppDispatch();

  const inputFieldRef = React.useRef<null | HTMLInputElement>(null);

  const addEncounterCallback = () => {
    if (inputFieldRef?.current && inputFieldRef.current?.value.length > 0) {
      dispatch(addEncounter(inputFieldRef.current.value));
      inputFieldRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-row items-end">
      <div className="form-control w-full max-w-xs mr-4">
        <label className="label" htmlFor="new-encounter">
          <span className="label-text">Encounter name</span>
        </label>
        <input
          type="text"
          id="new-encounter"
          className="input input-bordered w-full max-w-xs"
          ref={inputFieldRef}
          onKeyUp={(event) => {
            if (event.key.toLowerCase() === 'enter') {
              addEncounterCallback();
            }
          }}
        />
      </div>
      <button className="btn bg-base-100" onClick={addEncounterCallback}>
        Create
      </button>
    </div>
  );
};
