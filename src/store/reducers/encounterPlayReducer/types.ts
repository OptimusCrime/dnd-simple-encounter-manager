export enum Condition {
  BLINDED = 'Blinded',
  CHARMED = 'Charmed',
  DEAFENED = 'Deafened',
  FRIGHTENED = 'Frightened',
  GRAPPLED = 'Grappled',
  INCAPACITATED = 'Incapacitated',
  INVISIBLE = 'Invisible',
  PARALYZED = 'Paralyzed',
  PETRIFIED = 'Petrified',
  POISONED = 'Poisoned',
  PRONE = 'Prone',
  RESTRAINED = 'Restrained',
  STUNNED = 'Stunned',
  UNCONSCIOUS_OR_SLEEPING = 'Unconscious/Sleeping',
  EXHAUSTION = 'Exhaustion',
}

export interface EncounterPlayEntity {
  id: string;
  name: string;
  initiativeThrow: number | null;
  healthStart: number | null;
  healthCurrent: number | null;
  isPlayerCharacter: boolean;
  isSurprised: boolean;
  isDead: boolean;
  conditions: Condition[];
}

interface EffectBase {
  id: string;
  name: string;
  active: boolean;
  affected: string[];
}

export interface EffectProgress {
  type: 'progress';
  duration: number;
  progress: number;
  actualProgress: number;
}

export interface EffectLasting {
  type: 'lasting';
}

export type EncounterPlayEffect = EffectBase & (EffectProgress | EffectLasting);
