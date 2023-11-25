import React from 'react';

import { InitiativeEntityState } from '../types';

interface InitialDamageTakenInputFieldProps {
  entity: InitiativeEntityState;
  updateState: (id: string, state: Partial<InitiativeEntityState>) => void;
}

export const InitialDamageTakenInputField = (props: InitialDamageTakenInputFieldProps) => {
  const { entity, updateState } = props;

  if (entity.isPlayerCharacter) {
    return null;
  }

  return (
    <input
      type="text"
      tabIndex={-1}
      placeholder="Initial damage"
      className="input input-bordered w-full max-w-xs"
      defaultValue={
        entity.initialDamageTaken === null || entity.initialDamageTaken === 0 ? '' : entity.initialDamageTaken
      }
      onChange={(event) => {
        const value = event.target.value;
        if (/^[0-9]+$/.test(value)) {
          updateState(entity.id, {
            initialDamageTaken: parseInt(value),
          });
        }
      }}
    />
  );
};
