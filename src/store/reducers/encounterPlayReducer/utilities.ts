import { InitiativeEntityState } from '../../../pages/EncounterInitiative/types';
import { EncounterPlayEntity, LogMessage } from './types';

export const calculateCurrentHealth = (entity: InitiativeEntityState): number | null => {
  if (entity.isPlayerCharacter) {
    return null;
  }

  if (entity.startHealth === null || entity.initialDamageTaken === null) {
    return entity.startHealth;
  }

  return entity.startHealth - entity.initialDamageTaken;
};

export const createLogMessage = (entity: EncounterPlayEntity, change: number): LogMessage[] => {
  const messages: LogMessage[] = [];
  const name = `${entity.name} (${entity.number})`;
  if (entity.healthCurrent === null) {
    return [];
  }

  const oldHp = entity.healthCurrent;
  const newHp = entity.healthCurrent + change;

  if (change < 0) {
    messages.push({
      text: `${name} lost ${Math.abs(change)}HP from ${oldHp}HP to ${newHp}HP.`,
      className: 'text-error',
    });

    if (newHp <= 0 && oldHp > 0) {
      messages.push({
        text: `${name} is dead.`,
        className: 'text-error',
      });
    }
  } else {
    messages.push({
      text: `${name} gained ${Math.abs(change)}HP from ${oldHp}HP to ${newHp}HP.`,
    });

    if (newHp > 0 && oldHp <= 0) {
      messages.push({
        text: `${name} is alive again.`,
      });
    }
  }

  return messages;
};
