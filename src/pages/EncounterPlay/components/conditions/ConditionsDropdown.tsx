import React from 'react';

import { Dropdown } from '../../../../components';
import { Condition, EncounterPlayEntity } from '../../../../store/reducers/encounterPlayReducer';
import { ConditionsDropdownItem } from './ConditionsDropdownItem';

const conditions = Object.keys(Condition);

interface ConditionsDropdownProps {
  entity: EncounterPlayEntity;
}

export const ConditionsDropdown = (props: ConditionsDropdownProps) => {
  const { entity } = props;

  return (
    <Dropdown text="Conditions">
      {conditions.map((condition) => (
        <ConditionsDropdownItem key={condition} entity={entity} condition={condition as keyof typeof Condition} />
      ))}
    </Dropdown>
  );
};
