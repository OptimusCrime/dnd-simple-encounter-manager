import { InitiativeEntityState } from '../../../pages/EncounterInitiative/types';
import { EncounterPlayEntity } from './types';
import { calculateCurrentHealth, getName } from './utilities';

export const mapInitiativeEntityStateToEncounterPlayEntity = (
  entity: InitiativeEntityState,
  entities: InitiativeEntityState[],
): EncounterPlayEntity => {
  const healthCurrent = calculateCurrentHealth(entity);

  return {
    id: entity.id,
    name: getName(entity, entities),
    initiativeThrow: entity.initiative,
    healthStart: entity.startHealth,
    healthCurrent: healthCurrent,
    isPlayerCharacter: entity.isPlayerCharacter,
    isSurprised: entity.isSurprised,
    isDead: healthCurrent !== null && healthCurrent < 0,
    conditions: [],
  };
};
