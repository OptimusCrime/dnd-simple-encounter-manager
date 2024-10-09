import React from 'react';

import { Dropdown } from '../../../../components';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { deleteEffect, EncounterPlayEffect, resetEffect } from '../../../../store/reducers/encounterPlayReducer';
import { ReducerNames } from '../../../../store/reducers/reducerNames';
import { ChangeAffectedByEffectDropdownItem } from './ChangeAffectedByEffectDropdownItem';
import { ChangeAnchorEffectDropdownItem } from './ChangeAnchorEffectDropdownItem';

interface EffectButtonPanelProps {
  effect: EncounterPlayEffect;
}
export const EffectButtonsPanel = (props: EffectButtonPanelProps) => {
  const dispatch = useAppDispatch();

  const { entities } = useAppSelector((state) => state[ReducerNames.ENCOUNTER_PLAY]);
  const { effect } = props;

  return (
    <div className="flex flex-row justify-between">
      <Dropdown text="Affected" className="bg-base-100">
        {entities
          .filter((entity) => !entity.isDead)
          .map((entity) => (
            <ChangeAffectedByEffectDropdownItem key={entity.id} entity={entity} effect={effect} />
          ))}
      </Dropdown>
      <Dropdown text="Anchor" className="bg-base-100">
        {entities
          .filter((entity) => !entity.isDead)
          .map((entity) => (
            <ChangeAnchorEffectDropdownItem key={entity.id} entity={entity} effect={effect} />
          ))}
      </Dropdown>
      <button className="btn bg-base-100" onClick={() => dispatch(resetEffect(effect.id))}>
        Reset
      </button>
      <button className="btn bg-base-100" onClick={() => dispatch(deleteEffect(effect.id))}>
        Delete
      </button>
    </div>
  );
};
