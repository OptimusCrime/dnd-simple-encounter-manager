import { Monster } from './types';

export interface Encounter {
  id: string;
  name: string;
  ready: boolean;
  finished: boolean;
  monsters: Monster[];
}

export interface AddMonsterPayload {
  name: string;
  startHealth: string;
  clones: number;
  notes: string | null;
}
