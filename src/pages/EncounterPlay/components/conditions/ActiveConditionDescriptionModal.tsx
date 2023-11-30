import React from 'react';

import { Modal } from '../../../../components';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { setActiveConditionClicked } from '../../../../store/reducers/encounterPlayReducer';
import { ReducerNames } from '../../../../store/reducers/reducerNames';
import { hideModal } from '../../../../utilities/modal';
import { ActiveConditionDescriptionModalContent } from './ActiveConditionDescriptionModalContent';

export const ACTIVE_CONDITION_DESCRIPTION_MODAL_ID = 'active_condition_description_modal_id';

export const ActiveConditionDescriptionModal = () => {
  const dispatch = useAppDispatch();

  const { clickedActiveCondition } = useAppSelector((state) => state[ReducerNames.ENCOUNTER_PLAY]);

  return (
    <Modal id={ACTIVE_CONDITION_DESCRIPTION_MODAL_ID}>
      <h3 className="font-bold text-lg">{clickedActiveCondition ?? 'Unknown'}</h3>

      <div className="flex flex-col">
        <div className="flex flex-col pt-2 space-y-2">
          <ActiveConditionDescriptionModalContent condition={clickedActiveCondition} />
        </div>
        <div className="flex flex-row mt-4 justify-end">
          <button
            className="btn"
            onClick={() => {
              dispatch(setActiveConditionClicked(null));
              hideModal(ACTIVE_CONDITION_DESCRIPTION_MODAL_ID);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};
