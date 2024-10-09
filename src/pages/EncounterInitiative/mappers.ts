import { nanoid } from 'nanoid';

import { Encounter, Monster } from '../../store/reducers/encountersReducer';
import { InitiativeEntityState } from './types';

export const mapEncounterToInitiativeState = (
  encounter: Encounter | null,
  characters: string[],
): InitiativeEntityState[] => {
  if (!encounter) {
    return [];
  }

  // Let's always put the players on top
  const { monsters } = encounter;

  return [...characters.map(mapCharacterToEncounterEntity), ...monsters.map(mapMonsterToEncounterEntity)].map(
    (entity, index) => ({
      ...entity,
      order: index,
    }),
  );
};

const mapMonsterToEncounterEntity = (entity: Monster): InitiativeEntityState => {
  const { id, name, startHealth } = entity;

  return {
    id,
    name,
    order: 0,
    startHealth,
    initialDamageTaken: 0,
    isPlayerCharacter: false,
    initiative: null,
    notes: entity.notes,
  };
};

const mapCharacterToEncounterEntity = (name: string): InitiativeEntityState => ({
  id: nanoid(),
  name: name,
  order: 0,
  startHealth: null,
  initialDamageTaken: null,
  isPlayerCharacter: true,
  initiative: null,
  notes: null,
});
