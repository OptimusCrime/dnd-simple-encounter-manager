export interface InitiativeEntityState {
  id: string;
  name: string;
  order: number;
  startHealth: number | null;
  initialDamageTaken: number | null;
  isPlayerCharacter: boolean;
  initiative: number | null;
  notes: string | null;
}

export enum InitiativeMoveDirection {
  UP,
  DOWN,
}
