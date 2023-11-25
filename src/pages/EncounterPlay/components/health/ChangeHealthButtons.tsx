import React from 'react';

import { useAppDispatch } from '../../../../store/hooks';
import { EncounterPlayEntity, updateHealth } from '../../../../store/reducers/encounterPlayReducer';
import { ChangeHealthDropdown } from './ChangeHealthDropdown';

interface ChangeHealthButtonProps {
  direction: 'increase' | 'decrease';
  entity: EncounterPlayEntity;
}

const DIRECTION_VALUES = {
  decrease: [-10, -5, -1],
  increase: [1, 5, 10],
};

export const ChangeHealthButtons = (props: ChangeHealthButtonProps) => {
  const dispatch = useAppDispatch();

  const { entity, direction } = props;

  const values = DIRECTION_VALUES[direction];

  return (
    <div className="space-x-2 flex flex-row justify-between">
      {direction === 'increase' && <ChangeHealthDropdown {...props} />}

      {values.map((value) => (
        <button className="btn" key={value} onClick={() => dispatch(updateHealth({ id: entity.id, change: value }))}>
          {`${value > 0 ? '+' : ''}${value}HP`}
        </button>
      ))}

      {direction === 'decrease' && <ChangeHealthDropdown {...props} />}
    </div>
  );
};
