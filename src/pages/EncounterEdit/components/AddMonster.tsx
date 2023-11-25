import React from 'react';

import { useAppDispatch } from '../../../store/hooks';
import { addMonster } from '../../../store/reducers/encountersReducer';

export const AddMonster = () => {
  const dispatch = useAppDispatch();

  const monsterNameInputFieldRef = React.useRef<null | HTMLInputElement>(null);
  const monsterStartHealthInputFieldRef = React.useRef<null | HTMLInputElement>(null);
  const monsterCloneInputFieldRef = React.useRef<null | HTMLInputElement>(null);

  const addMonsterCallback = () => {
    if (
      monsterNameInputFieldRef?.current &&
      monsterStartHealthInputFieldRef?.current &&
      monsterCloneInputFieldRef?.current
    ) {
      dispatch(
        addMonster({
          name: monsterNameInputFieldRef.current.value,
          startHealth: monsterStartHealthInputFieldRef.current.value,
          clones: parseInt(monsterCloneInputFieldRef.current.value),
        }),
      );

      monsterNameInputFieldRef.current.value = '';
      monsterStartHealthInputFieldRef.current.value = '';
      monsterCloneInputFieldRef.current.value = '1';
    }
  };

  return (
    <div className="flex flex-row items-end">
      <div className="form-control w-full max-w-xs mr-4">
        <label className="label" htmlFor="monster-name">
          <span className="label-text">Monster name</span>
        </label>
        <input
          type="text"
          placeholder="Goblin"
          id="monster-name"
          className="input input-bordered w-full max-w-xs"
          ref={monsterNameInputFieldRef}
        />
      </div>

      <div className="form-control w-full max-w-xs mr-4">
        <label className="label" htmlFor="monster-start-health">
          <span className="label-text">Monster start health</span>
        </label>
        <input
          type="text"
          placeholder="12d10+54"
          id="monster-start-health"
          className="input input-bordered w-full max-w-xs"
          ref={monsterStartHealthInputFieldRef}
        />
      </div>

      <div className="form-control w-full max-w-xs mr-4">
        <label className="label" htmlFor="monster-clone-number">
          <span className="label-text">Monster clone number</span>
        </label>
        <input
          type="text"
          placeholder="1"
          id="monster-clone-number"
          defaultValue={1}
          className="input input-bordered w-full max-w-xs"
          ref={monsterCloneInputFieldRef}
        />
      </div>

      <button className="btn bg-base-100" onClick={addMonsterCallback}>
        Add
      </button>
    </div>
  );
};
