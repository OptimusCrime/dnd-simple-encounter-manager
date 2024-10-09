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
  number: number;
  name: string;
  initiativeThrow: number | null;
  healthStart: number | null;
  healthCurrent: number | null;
  isPlayerCharacter: boolean;
  isDead: boolean;
  conditions: Condition[];
  notes: string | null;
}

interface EffectBase {
  id: string;
  name: string;
  active: boolean;
  affected: string[];
}

export interface EffectProgress {
  type: 'progress';
  anchor: string;
  duration: number;
  progress: number;
  actualProgress: number;
  initialRoundPassed: boolean;
}

export interface EffectLasting {
  type: 'lasting';
}

export interface LogMessage {
  text: string;
  className?: string;
}

export type EncounterPlayEffect = EffectBase & (EffectProgress | EffectLasting);
