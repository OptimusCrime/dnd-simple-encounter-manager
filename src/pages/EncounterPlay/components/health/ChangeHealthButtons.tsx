import React from 'react';

import { EncounterPlayEntity } from '../../../../store/reducers/encounterPlayReducer';
import { ChangeHealthDropdown } from './ChangeHealthDropdown';

interface ChangeHealthButtonProps {
  direction: 'increase' | 'decrease';
  entity: EncounterPlayEntity;
}

export const ChangeHealthButtons = (props: ChangeHealthButtonProps) => {
  const { direction } = props;

  return (
    <div className="space-x-2 flex flex-row justify-between">
      {direction === 'increase' && <ChangeHealthDropdown {...props} />}

      {direction === 'decrease' && <ChangeHealthDropdown {...props} />}
    </div>
  );
};
