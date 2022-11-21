export interface InitiativeEntityState {
  id: number;
  name: string;
  order: number;
  startHealth: number | null;
  physicalIdentifier: string;
  isPlayerCharacter: boolean;
  isSurprised: boolean;
  inPlay: boolean;
  initiative: number | null;
}
