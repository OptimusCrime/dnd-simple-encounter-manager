import React from 'react';

import { EncounterPlayEntity } from '../../../store/reducers/encounterPlayReducer';

interface NamePanelProps {
  entity: EncounterPlayEntity;
}

export const NamePanel = (props: NamePanelProps) => {
  const { entity } = props;

  return (
    <div className="flex flex-col">
      <div>
        <span className="text-base">
          <strong>
            {entity.name} ({entity.number})
          </strong>
        </span>
      </div>
      <div>Initiative: {entity.initiativeThrow ?? 'None'}</div>
    </div>
  );
};
