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
    <Dropdown text="Conditions" dropdownClassName="grid grid-cols-5 gap-2 !w-[750px]">
      {conditions.map((condition) => (
        <ConditionsDropdownItem key={condition} entity={entity} condition={condition as keyof typeof Condition} />
      ))}
    </Dropdown>
  );
};
