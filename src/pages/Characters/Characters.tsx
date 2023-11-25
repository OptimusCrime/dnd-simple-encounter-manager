import React from 'react';

import { Heading } from '../../components';
import { ListCharacters, NewCharacter } from './components';

export const Characters = () => (
  <>
    <div>
      <Heading text="Characters" />
      <div className="card bg-neutral text-neutral-content card-compact">
        <div className="card-body prose">
          <ListCharacters />
        </div>
      </div>
    </div>
    <div className="mt-8">
      <Heading text="Add character" />
      <div className="card bg-neutral text-neutral-content card-compact">
        <div className="card-body">
          <NewCharacter />
        </div>
      </div>
    </div>
  </>
);
