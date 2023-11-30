import React from 'react';

import { Dropdown } from '../../../../components';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { deleteEffect, EncounterPlayEffect, resetEffect } from '../../../../store/reducers/encounterPlayReducer';
import { ReducerNames } from '../../../../store/reducers/reducerNames';
import { ChangeAffectedByEffectDropdownItem } from './ChangeAffectedByEffectDropdownItem';

interface EffectButtonPanelProps {
  effect: EncounterPlayEffect;
}
export const EffectButtonsPanel = (props: EffectButtonPanelProps) => {
  const dispatch = useAppDispatch();

  const { entities } = useAppSelector((state) => state[ReducerNames.ENCOUNTER_PLAY]);
  const { effect } = props;

  return (
    <div className="flex flex-row justify-between">
      <Dropdown text="Change affected" className="bg-base-100">
        {entities.map((entity) => (
          <ChangeAffectedByEffectDropdownItem key={entity.id} entity={entity} effect={effect} />
        ))}
      </Dropdown>
      <button className="btn bg-base-100" onClick={() => dispatch(resetEffect(effect.id))}>
        Reset progress
      </button>
      <button className="btn bg-base-100" onClick={() => dispatch(deleteEffect(effect.id))}>
        Delete effect
      </button>
    </div>
  );
};
