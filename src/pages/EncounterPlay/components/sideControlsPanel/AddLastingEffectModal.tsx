import React, { useState } from 'react';

import { Modal } from '../../../../components';
import { useAppDispatch } from '../../../../store/hooks';
import { addEffect } from '../../../../store/reducers/encounterPlayReducer';
import { hideModal } from '../../../../utilities/modal';

export const ADD_LASTING_EFFECT_MODAL_ID = 'add_lasting_effect_modal_id';

const EFFECT_NAME_FORM_ID = 'add_lasting_effect_effect_name_form_id';

export const AddLastingEffectModal = () => {
  const dispatch = useAppDispatch();

  const [effectName, setEffectName] = useState('');

  const submit = () => {
    dispatch(
      addEffect({
        type: 'lasting',
        name: effectName,
      }),
    );

    setEffectName('');

    (document.getElementById(EFFECT_NAME_FORM_ID) as HTMLInputElement).value = '';
    hideModal(ADD_LASTING_EFFECT_MODAL_ID);
  };

  return (
    <Modal id={ADD_LASTING_EFFECT_MODAL_ID}>
      <h3 className="font-bold text-lg">Add lasting effect</h3>

      <div className="flex flex-col space-y-4 pt-4">
        <div>
          <input
            id={EFFECT_NAME_FORM_ID}
            type="text"
            placeholder="Effect name"
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
        <div className="flex flex-row space-x-4 justify-end">
          <button className="btn" onClick={() => hideModal(ADD_LASTING_EFFECT_MODAL_ID)}>
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
