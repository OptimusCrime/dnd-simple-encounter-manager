import React from 'react';

import { useAppDispatch } from '../../../store/hooks';
import { addCharacter } from '../../../store/reducers/characterReducer';

interface NewCharacterProps {
  setId: string;
}

export const NewCharacter = (props: NewCharacterProps) => {
  const { setId } = props;

  const dispatch = useAppDispatch();
  const inputFieldRef = React.useRef<null | HTMLInputElement>(null);

  const addCharacterCallback = () => {
    if (inputFieldRef?.current && inputFieldRef.current?.value.length > 0) {
      dispatch(
        addCharacter({
          set: setId,
          character: inputFieldRef.current.value,
        }),
      );
      inputFieldRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-row items-end">
      <div className="form-control w-full max-w-xs mr-4">
        <label className="label" htmlFor="new-character">
          <span className="label-text">Character name</span>
        </label>
        <input
          type="text"
          id="new-character"
          className="input input-bordered w-full max-w-xs"
          ref={inputFieldRef}
          onKeyUp={(event) => {
            if (event.key.toLowerCase() === 'enter') {
              addCharacterCallback();
            }
          }}
        />
      </div>
      <button className="btn bg-base-100" onClick={addCharacterCallback}>
        Add
      </button>
    </div>
  );
};
