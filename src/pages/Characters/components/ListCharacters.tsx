import React, { useEffect, useState } from 'react';

import { CharacterSet } from '../../../store/reducers/characterReducer/types';
import { ListCharactersItems } from './ListCharactersItems';
import { ListCharactersSetSelectPanel } from './ListCharactersSetSelectPanel';
import { NewCharacter } from './NewCharacter';

interface ListCharactersProps {
  sets: CharacterSet[];
  defaultSet: CharacterSet | null;
}

export const ListCharacters = (props: ListCharactersProps) => {
  const { sets, defaultSet } = props;

  const [currentSet, setCurrentSet] = useState<CharacterSet | null>(defaultSet);

  useEffect(() => {
    setCurrentSet(defaultSet);
  }, [defaultSet]);

  if (sets.length === 0 || currentSet === null) {
    return <p className="prose-md">No sets added.</p>;
  }

  return (
    <div className="flex flex-col space-y-4">
      <ListCharactersSetSelectPanel setCurrentSet={setCurrentSet} sets={sets} currentSet={currentSet} />

      <ListCharactersItems set={currentSet} />

      <NewCharacter setId={currentSet.id} />
    </div>
  );
};
