import React from 'react';

import { DropdownItemToggle } from '../../../../components';
import { useAppDispatch } from '../../../../store/hooks';
import { Condition, EncounterPlayEntity, updateCondition } from '../../../../store/reducers/encounterPlayReducer';

interface ConditionsDropdownItemProps {
  entity: EncounterPlayEntity;
  condition: keyof typeof Condition;
}

export const ConditionsDropdownItem = (props: ConditionsDropdownItemProps) => {
  const dispatch = useAppDispatch();

  const { entity, condition } = props;

  const enumKey = condition as keyof typeof Condition;
  const value = Condition[enumKey];
  const enabled = entity.conditions.includes(value);

  const onClick = () => {
    dispatch(
      updateCondition({
        id: entity.id,
        condition: value,
        enabled: !enabled,
      }),
    );
  };

  return (
    <DropdownItemToggle checked={enabled} onClick={onClick}>
      {value}
    </DropdownItemToggle>
  );
};
