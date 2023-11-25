import React from 'react';

import { useAppSelector } from '../../../../store/hooks';
import { EncounterPlayEffect, EncounterPlayEntity } from '../../../../store/reducers/encounterPlayReducer';
import { ReducerNames } from '../../../../store/reducers/reducerNames';

interface ConditionsAndEffectsPanelProps {
  entity: EncounterPlayEntity;
}

const findEffectsForEntity = (effects: EncounterPlayEffect[], entity: EncounterPlayEntity) =>
  effects.filter((effects) => effects.affected.includes(entity.id) && effects.active);

const mapEffects = (effects: EncounterPlayEffect[]): string[] => effects.map((effect) => effect.name);

export const ConditionsAndEffectsPanel = (props: ConditionsAndEffectsPanelProps) => {
  const { effects } = useAppSelector((state) => state[ReducerNames.ENCOUNTER_PLAY]);
  const { entity } = props;

  const effectsForEntity = findEffectsForEntity(effects, entity);

  return (
    <div className="flex flex-col space-y-2">
      <div>
        <strong>Conditions:</strong> {entity.conditions.length === 0 ? <i>None</i> : entity.conditions.join(', ')}
      </div>
      <div>
        <strong>Effects:</strong>{' '}
        {effectsForEntity.length === 0 ? <i>None</i> : mapEffects(effectsForEntity).join(', ')}
      </div>
    </div>
  );
};
