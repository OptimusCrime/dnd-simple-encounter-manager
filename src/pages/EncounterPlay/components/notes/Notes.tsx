import React from 'react';

import { EncounterPlayEntity } from '../../../../store/reducers/encounterPlayReducer';

interface NotesProps {
  entity: EncounterPlayEntity;
}

export const Notes = (props: NotesProps) => {
  const { entity } = props;

  if (entity.notes === null) {
    return null;
  }

  return (
    <div className="flex flex-col">
      {entity.notes
        .split('\n')
        .filter((line) => line.length > 0)
        .map((line) => (
          <p>{line}</p>
        ))}
    </div>
  );
};
