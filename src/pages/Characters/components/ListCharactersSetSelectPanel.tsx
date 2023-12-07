import React from 'react';

import { useAppDispatch } from '../../../store/hooks';
import { removeCharacterSet } from '../../../store/reducers/characterReducer';
import { CharacterSet } from '../../../store/reducers/characterReducer/types';

interface ListCharactersDropdownProps {
  setCurrentSet: (value: CharacterSet) => void;
  currentSet: CharacterSet | null;
  sets: CharacterSet[];
}

export const ListCharactersSetSelectPanel = (props: ListCharactersDropdownProps) => {
  const dispatch = useAppDispatch();

  const { sets, currentSet, setCurrentSet } = props;

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
            setCurrentSet(set);
          }}
          defaultValue={sets[0].id}
        >
          {sets.map((set) => (
            <option value={set.id} key={set.id}>
              {set.name}
            </option>
          ))}
        </select>
      </div>
      {currentSet !== null && (
        <div>
          <button
            className="btn btn-error"
            onClick={() => {
              dispatch(removeCharacterSet(currentSet.id));

              // If possible, set another character set as the default one
              const anotherSet = sets.find((set) => set.id !== currentSet.id);
              if (anotherSet) {
                setCurrentSet(anotherSet);
              }
            }}
          >
            Delete character set
          </button>
        </div>
      )}
    </div>
  );
};
