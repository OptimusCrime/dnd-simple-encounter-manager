import { EncounterPlayEffect, EncounterPlayEntity } from '../../../../store/reducers/encounterPlayReducer';

export const findEffectsForEntity = (effects: EncounterPlayEffect[], entity: EncounterPlayEntity) =>
  effects.filter((effects) => effects.affected.includes(entity.id) && effects.active);
