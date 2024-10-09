import React from 'react';

import { useAppDispatch } from '../../../store/hooks';
import { addMonster } from '../../../store/reducers/encountersReducer';

export const AddMonster = () => {
  const dispatch = useAppDispatch();

  const monsterNameInputFieldRef = React.useRef<null | HTMLInputElement>(null);
  const monsterStartHealthInputFieldRef = React.useRef<null | HTMLInputElement>(null);
  const monsterCloneInputFieldRef = React.useRef<null | HTMLInputElement>(null);
  const monsterNotesInputFieldRef = React.useRef<null | HTMLTextAreaElement>(null);

  const addMonsterCallback = () => {
    if (
      monsterNameInputFieldRef?.current &&
      monsterStartHealthInputFieldRef?.current &&
      monsterCloneInputFieldRef?.current &&
      monsterNotesInputFieldRef.current
    ) {
      const notes = monsterNotesInputFieldRef.current?.value;

      dispatch(
        addMonster({
          name: monsterNameInputFieldRef.current.value,
          startHealth: monsterStartHealthInputFieldRef.current.value,
          clones: parseInt(monsterCloneInputFieldRef.current.value),
          notes: notes.length === 0 ? null : notes,
        }),
      );

      monsterNameInputFieldRef.current.value = '';
      monsterStartHealthInputFieldRef.current.value = '';
      monsterCloneInputFieldRef.current.value = '1';
      monsterNotesInputFieldRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col space-y-4 w-full max-w-4xl">
      <div className="flex flex-row">
        <div className="form-control w-full max-w-xs mr-4">
          <label className="label" htmlFor="monster-name">
            <span className="label-text">Monster name</span>
          </label>
          <input
            type="text"
            id="monster-name"
            className="input input-bordered w-full max-w-xs"
            ref={monsterNameInputFieldRef}
          />
        </div>

        <div className="form-control w-full max-w-xs mr-4">
          <label className="label" htmlFor="monster-start-health">
            <span className="label-text">Monster start health (e.g. 2d6 + 2)</span>
          </label>
          <input
            type="text"
            id="monster-start-health"
            className="input input-bordered w-full max-w-xs"
            ref={monsterStartHealthInputFieldRef}
            onKeyUp={(event) => {
              if (event.key.toLowerCase() === 'enter') {
                addMonsterCallback();
                monsterNameInputFieldRef.current?.focus();
              }
            }}
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
            onKeyUp={(event) => {
              if (event.key.toLowerCase() === 'enter') {
                addMonsterCallback();
                monsterNameInputFieldRef.current?.focus();
              }
            }}
          />
        </div>
      </div>
      <div>
        <label className="form-control">
          <div className="label">
            <span className="label-text">Notes</span>
          </div>
          <textarea className="textarea textarea-bordered h-24" ref={monsterNotesInputFieldRef} />
        </label>
      </div>
      <div>
        <button className="btn bg-base-100" onClick={addMonsterCallback}>
          Add
        </button>
      </div>
    </div>
  );
};
