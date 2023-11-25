import React from 'react';

import { Heading } from '../../components';
import { ListEncounters, NewEncounter } from './components';

export const EncountersList = () => (
  <div>
    <div>
      <Heading text="Encounters" />
      <div className="card bg-neutral text-neutral-content card-compact">
        <div className="card-body prose">
          <ListEncounters />
        </div>
      </div>
    </div>
    <div className="mt-8">
      <Heading text="New encounter" />
      <div className="card bg-neutral text-neutral-content card-compact">
        <div className="card-body">
          <NewEncounter />
        </div>
      </div>
    </div>
  </div>
);
