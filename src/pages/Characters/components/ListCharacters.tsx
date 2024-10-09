import React from 'react';

import { useAppSelector } from '../../../store/hooks';
import { CharacterSet } from '../../../store/reducers/characterReducer/types';
import { ReducerNames } from '../../../store/reducers/reducerNames';
import { ListCharactersItems } from './ListCharactersItems';
import { ListCharactersSetSelectPanel } from './ListCharactersSetSelectPanel';
import { NewCharacter } from './NewCharacter';

const getSet = (sets: CharacterSet[], currentSetId: string | null): CharacterSet => {
  const currentSet = sets.find((set) => set.id === currentSetId);
  if (!currentSet) {
    return sets[0];
  }

  return currentSet;
};

export const ListCharacters = () => {
  const { selectedSet, sets } = useAppSelector((state) => state[ReducerNames.CHARACTERS]);

  if (sets.length === 0) {
    return <p className="prose-md">No sets added.</p>;
  }

  const currentSet = getSet(sets, selectedSet);

  return (
    <div className="flex flex-col space-y-4">
      <ListCharactersSetSelectPanel currentSet={currentSet} />

      <ListCharactersItems currentSet={currentSet} />

      <NewCharacter currentSetId={currentSet.id} />
    </div>
  );
};
