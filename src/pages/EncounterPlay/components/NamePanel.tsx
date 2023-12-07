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
        <span className="text-base">
          <strong>
            {index + 1}. {entity.name}
          </strong>
        </span>

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
