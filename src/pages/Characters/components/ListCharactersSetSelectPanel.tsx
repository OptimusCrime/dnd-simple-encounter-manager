import React from 'react';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { removeCharacterSet, selectCharacterSet } from '../../../store/reducers/characterReducer';
import { CharacterSet } from '../../../store/reducers/characterReducer/types';
import { ReducerNames } from '../../../store/reducers/reducerNames';

interface ListCharactersDropdownProps {
  currentSet: CharacterSet;
}

export const ListCharactersSetSelectPanel = (props: ListCharactersDropdownProps) => {
  const { sets } = useAppSelector((state) => state[ReducerNames.CHARACTERS]);
  const dispatch = useAppDispatch();

  const { currentSet } = props;

  return (
    <div className="flex items-end w-full justify-between">
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Select character set</span>
        </label>
        <select
          className="select select-bordered"
          onChange={(event) => {
            const set = sets.find((set) => set.id === event.target.value);
            if (!set) {
              return;
            }
            dispatch(selectCharacterSet(set.id));
          }}
          defaultValue={currentSet.id}
        >
          {sets.map((set) => (
            <option value={set.id} key={set.id}>
              {set.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button
          className="btn btn-error"
          onClick={() => {
            dispatch(removeCharacterSet(currentSet.id));

            // If possible, set another character set as the default one
            const anotherSet = sets.find((set) => set.id !== currentSet.id);
            if (anotherSet) {
              dispatch(selectCharacterSet(anotherSet.id));
            } else {
              dispatch(selectCharacterSet(null));
            }
          }}
        >
          Delete character set
        </button>
      </div>
    </div>
  );
};
