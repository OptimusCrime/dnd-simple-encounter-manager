export interface Encounter {
  id: string;
  name: string;
  ready: boolean;
  finished: boolean;
  monsters: Monster[];
}

export interface Monster {
  id: string;
  name: string;
  startHealth: number | null;
  startHealthExpression: string | null;
  notes: string | null;
}
