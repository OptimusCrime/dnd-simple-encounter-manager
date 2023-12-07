import { InitiativeEntityState } from '../../../pages/EncounterInitiative/types';

export const getName = (entity: InitiativeEntityState, entities: InitiativeEntityState[]) => {
  if (entity.isPlayerCharacter) {
    return entity.name;
  }

  // Check for identical names
  const entitiesWithSameName = entities.filter((e) => e.name === entity.name);
  if (entitiesWithSameName.length === 1) {
    return entity.name;
  }

  // Multiple names, find out current order
  const index = entities.findIndex((e) => e.order === entity.order);

  // I guess this can never happen, but who cares
  if (index === -1) {
    return entity.name;
  }

  return `${entity.name} #${index + 1}`;
};

export const calculateCurrentHealth = (entity: InitiativeEntityState): number | null => {
  if (entity.isPlayerCharacter) {
    return null;
  }

  if (entity.startHealth === null || entity.initialDamageTaken === null) {
    return entity.startHealth;
  }

  return entity.startHealth - entity.initialDamageTaken;
};
