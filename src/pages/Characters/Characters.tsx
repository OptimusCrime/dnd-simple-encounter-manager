import React from 'react';

import { Heading } from '../../components';
import { useAppSelector } from '../../store/hooks';
import { ReducerNames } from '../../store/reducers/reducerNames';
import { ListCharacters, NewCharacterSet } from './components';

export const Characters = () => {
  const { sets } = useAppSelector((state) => state[ReducerNames.CHARACTERS]);

  return (
    <>
      <div>
        <Heading text="Characters" />
        <div className="card bg-neutral text-neutral-content card-compact">
          <div className="card-body">
            <ListCharacters sets={sets} defaultSet={sets.length === 0 ? null : sets[0]} />
          </div>
        </div>
      </div>
      <div className="mt-8">
        <Heading text="New character set" />
        <div className="card bg-neutral text-neutral-content card-compact">
          <div className="card-body">
            <NewCharacterSet />
          </div>
        </div>
      </div>
    </>
  );
};
