import React from 'react';

import { Condition, EncounterPlayEffect } from '../../../../store/reducers/encounterPlayReducer';
import { ConditionsPanel } from '../conditions/ConditionsPanel';

interface ConditionsAndEffectsPanelProps {
  effects: EncounterPlayEffect[];
  conditions: Condition[];
}

const mapEffects = (effects: EncounterPlayEffect[]): string[] => effects.map((effect) => effect.name);

export const ConditionsAndEffectsPanel = (props: ConditionsAndEffectsPanelProps) => {
  const { effects, conditions } = props;

  return (
    <div className="flex flex-col space-y-2">
      {conditions.length > 0 && (
        <div>
          <strong>Conditions:</strong> <ConditionsPanel conditions={conditions} />
        </div>
      )}
      {effects.length > 0 && (
        <div>
          <strong>Effects:</strong> {mapEffects(effects).join(', ')}
        </div>
      )}
    </div>
  );
};
