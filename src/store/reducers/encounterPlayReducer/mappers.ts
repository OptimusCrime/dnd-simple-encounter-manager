import { InitiativeEntityState } from '../../../pages/EncounterInitiative/types';
import { EncounterPlayEntity } from './types';
import { calculateCurrentHealth } from './utilities';

export const mapInitiativeEntityStateToEncounterPlayEntity = (
  entity: InitiativeEntityState,
  index: number,
): EncounterPlayEntity => {
  const healthCurrent = calculateCurrentHealth(entity);

  return {
    id: entity.id,
    name: entity.name,
    number: index + 1,
    initiativeThrow: entity.initiative,
    healthStart: entity.startHealth,
    healthCurrent: healthCurrent,
    isPlayerCharacter: entity.isPlayerCharacter,
    isDead: healthCurrent !== null && healthCurrent < 0,
    conditions: [],
    notes: entity.notes,
  };
};
