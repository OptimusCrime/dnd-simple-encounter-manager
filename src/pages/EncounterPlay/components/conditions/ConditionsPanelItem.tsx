import React from 'react';

import { useAppDispatch } from '../../../../store/hooks';
import { Condition, setActiveConditionClicked } from '../../../../store/reducers/encounterPlayReducer';
import { showModal } from '../../../../utilities/modal';
import { ACTIVE_CONDITION_DESCRIPTION_MODAL_ID } from './ActiveConditionDescriptionModal';

interface ConditionsPanelItemProps {
  condition: Condition;
}

export const ConditionsPanelItem = (props: ConditionsPanelItemProps) => {
  const { condition } = props;

  const dispatch = useAppDispatch();

  return (
    <span
      className="cursor-pointer"
      onClick={() => {
        dispatch(setActiveConditionClicked(condition));
        showModal(ACTIVE_CONDITION_DESCRIPTION_MODAL_ID);
      }}
    >
      {condition}
    </span>
  );
};
