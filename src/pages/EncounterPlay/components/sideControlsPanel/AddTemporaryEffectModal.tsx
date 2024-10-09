import React, { useState } from 'react';

import { Modal } from '../../../../components';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { addEffect } from '../../../../store/reducers/encounterPlayReducer';
import { ReducerNames } from '../../../../store/reducers/reducerNames';
import { hideModal } from '../../../../utilities/modal';

export const ADD_TEMPORARY_EFFECT_MODAL_ID = 'add_temporary_effect_modal_id';

const EFFECT_NAME_FORM_ID = 'add_temporary_effect_effect_name_form_id';
const EFFECT_DURATION_FORM_ID = 'add_temporary_effect_effect_duration_form_id';

const DEFAULT_DURATION_VALUE = '60';

export const AddTemporaryEffectModal = () => {
  const dispatch = useAppDispatch();

  const { currentTurn } = useAppSelector((state) => state[ReducerNames.ENCOUNTER_PLAY]);

  const [effectName, setEffectName] = useState('');
  const [duration, setDuration] = useState(DEFAULT_DURATION_VALUE);

  const submit = () => {
    let success = false;
    const durationInt = parseInt(duration) || 0;

    if (durationInt !== 0) {
      dispatch(
        addEffect({
          type: 'progress',
          anchor: currentTurn,
          name: effectName,
          duration: durationInt,
        }),
      );

      success = true;
    }

    if (success) {
      setEffectName('');
      setDuration(DEFAULT_DURATION_VALUE);

      (document.getElementById(EFFECT_NAME_FORM_ID) as HTMLInputElement).value = '';
      (document.getElementById(EFFECT_DURATION_FORM_ID) as HTMLInputElement).value = '';

      hideModal(ADD_TEMPORARY_EFFECT_MODAL_ID);
    }
  };

  return (
    <Modal id={ADD_TEMPORARY_EFFECT_MODAL_ID}>
      <h3 className="font-bold text-lg">Add temporary effect</h3>

      <div className="flex flex-col space-y-4 pt-4">
        <div className="space-y-4">
          <div className="form-control w-full mr-4">
            <label className="label" htmlFor={EFFECT_NAME_FORM_ID}>
              <span className="label-text">Effect name</span>
            </label>
            <input
              id={EFFECT_NAME_FORM_ID}
              type="text"
              className="input input-bordered w-full"
              defaultValue=""
              onChange={(event) => setEffectName(event.target.value)}
              onKeyUp={(event) => {
                if (event.key.toLowerCase() === 'enter') {
                  submit();
                }
              }}
            />
          </div>

          <div className="form-control w-full mr-4">
            <label className="label" htmlFor={EFFECT_DURATION_FORM_ID}>
              <span className="label-text">Duration (seconds)</span>
            </label>
            <input
              id={EFFECT_DURATION_FORM_ID}
              type="text"
              className="input input-bordered w-full"
              defaultValue="60"
              onChange={(event) => setDuration(event.target.value)}
              onKeyUp={(event) => {
                if (event.key.toLowerCase() === 'enter') {
                  submit();
                }
              }}
            />
          </div>
        </div>
        <div className="flex flex-row space-x-4 justify-end">
          <button className="btn" onClick={() => hideModal(ADD_TEMPORARY_EFFECT_MODAL_ID)}>
            Close
          </button>
          <button className="btn btn-info" onClick={submit}>
            Add effect
          </button>
        </div>
      </div>
    </Modal>
  );
};
