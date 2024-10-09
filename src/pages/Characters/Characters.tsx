import React from 'react';

import { Heading } from '../../components';
import { ListCharacters, NewCharacterSet } from './components';

export const Characters = () => (
  <>
    <div>
      <Heading text="Characters" />
      <div className="card bg-neutral text-neutral-content card-compact">
        <div className="card-body">
          <ListCharacters />
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
