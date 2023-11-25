import React from 'react';

import { EncounterPlayEntity } from '../../../store/reducers/encounterPlayReducer';

interface NamePanelProps {
  index: number;
  entity: EncounterPlayEntity;
}

export const NamePanel = (props: NamePanelProps) => {
  const { index, entity } = props;

  return (
    <div className="flex flex-col">
      <div>
        <strong>{index + 1}.</strong> {entity.name}
        {entity.isSurprised && (
          <>
            {' '}
            <strong className="text-error">[SURPRISED!]</strong>
          </>
        )}
      </div>
      <div>Initiative: {entity.initiativeThrow ?? 'None'}</div>
    </div>
  );
};
