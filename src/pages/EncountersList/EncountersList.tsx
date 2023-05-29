import React from 'react';

import { Content } from '../../layout/Content';
import { ListEncounters, NewEncounter } from './components';

export const EncountersList = () => (
  <>
    <Content title="Encounters">
      <div className="card bg-neutral text-neutral-content card-compact">
        <div className="card-body prose">
          <ListEncounters />
        </div>
      </div>
    </Content>
    <Content title="New encounter" className="mt-8">
      <div className="card bg-neutral text-neutral-content card-compact">
        <div className="card-body">
          <NewEncounter />
        </div>
      </div>
    </Content>
  </>
);
