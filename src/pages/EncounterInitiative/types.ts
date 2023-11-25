export interface InitiativeEntityState {
  id: string;
  name: string;
  order: number;
  startHealth: number | null;
  initialDamageTaken: number | null;
  isPlayerCharacter: boolean;
  isSurprised: boolean;
  initiative: number | null;
}

export enum InitiativeMoveDirection {
  UP,
  DOWN,
}
