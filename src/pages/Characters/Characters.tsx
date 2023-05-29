import React from 'react';

import { Content } from '../../layout/Content';
import { ListCharacters, NewCharacter } from './components';

export const Characters = () => (
  <>
    <Content title="Characters">
      <div className="card bg-neutral text-neutral-content card-compact">
        <div className="card-body prose">
          <ListCharacters />
        </div>
      </div>
    </Content>
    <Content title="Add character" className="mt-8">
      <div className="card bg-neutral text-neutral-content card-compact">
        <div className="card-body">
          <NewCharacter />
        </div>
      </div>
    </Content>
  </>
);
