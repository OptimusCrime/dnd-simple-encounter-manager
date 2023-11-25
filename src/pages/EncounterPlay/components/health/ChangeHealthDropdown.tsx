import React from 'react';

import { Dropdown } from '../../../../components';
import { useAppDispatch } from '../../../../store/hooks';
import { EncounterPlayEntity, updateHealth } from '../../../../store/reducers/encounterPlayReducer';

const createFormInputId = (entity: EncounterPlayEntity, direction: 'increase' | 'decrease') =>
  `change_health_dropdown_input_form_id_${entity.id}_${direction}`;

interface ChangeHealthDropdownProps {
  direction: 'increase' | 'decrease';
  entity: EncounterPlayEntity;
}

export const ChangeHealthDropdown = (props: ChangeHealthDropdownProps) => {
  const dispatch = useAppDispatch();

  const { entity, direction } = props;

  const elementId = createFormInputId(entity, direction);

  // I don't know if this is illegal ¯\_(ツ)_/¯
  const focusInputField = () => {
    setTimeout(() => {
      const element = document.getElementById(elementId);
      if (element) {
        (element as HTMLInputElement).focus();
      }
    }, 100);
  };

  return (
    <Dropdown text={direction === 'decrease' ? '-' : '+'} onOpen={focusInputField}>
      <input
        id={elementId}
        type="text"
        tabIndex={-1}
        placeholder={`${direction === 'decrease' ? 'Decrease' : 'Increase'} health`}
        className="input input-bordered w-full max-w-xs"
        onKeyUp={(event) => {
          if (event.key.toLowerCase() === 'enter') {
            const value = event.currentTarget.value;

            if (/^[0-9]+$/.test(value)) {
              dispatch(
                updateHealth({
                  id: entity.id,
                  change: parseInt(value) * (direction === 'decrease' ? -1 : 1),
                }),
              );
            }

            event.currentTarget.value = '';
            event.currentTarget.blur();
            event.currentTarget.parentNode?.dispatchEvent(new Event('blur'));
          }
        }}
      />
    </Dropdown>
  );
};
