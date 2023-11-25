import React from 'react';

import { EncounterPlayEntity } from '../../../../store/reducers/encounterPlayReducer';
import { ChangeHealthButtons } from './ChangeHealthButtons';

interface ChangeHealthPanelProps {
  entity: EncounterPlayEntity;
}

export const ChangeHealthPanel = (props: ChangeHealthPanelProps) => {
  const { entity } = props;

  if (entity.isPlayerCharacter) {
    return null;
  }

  return (
    <div className="flex flex-row justify-between">
      <ChangeHealthButtons entity={entity} direction="decrease" />
      <div className="flex px-5 self-center">
        {entity.healthCurrent}HP / {entity.healthStart}HP
      </div>
      <ChangeHealthButtons entity={entity} direction="increase" />
    </div>
  );
};
