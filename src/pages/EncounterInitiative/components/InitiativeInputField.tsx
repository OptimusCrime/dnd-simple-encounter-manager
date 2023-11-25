import React from 'react';

import { InitiativeEntityState } from '../types';

interface InitiativeInputFieldProps {
  entity: InitiativeEntityState;
  idx: number;
  updateState: (id: string, state: Partial<InitiativeEntityState>) => void;
}

export const InitiativeInputField = (props: InitiativeInputFieldProps) => {
  const { entity, idx, updateState } = props;

  return (
    <div className="w-64">
      <input
        type="text"
        placeholder="Initiative"
        className="input input-bordered w-full max-w-xs"
        defaultValue={entity.initiative ?? ''}
        tabIndex={idx + 1}
        onChange={(event) => {
          const value = event.target.value;
          if (/^[0-9]+$/.test(value)) {
            updateState(entity.id, {
              initiative: parseInt(value),
            });
          } else {
            updateState(entity.id, {
              initiative: null,
            });
          }
        }}
      />
    </div>
  );
};
