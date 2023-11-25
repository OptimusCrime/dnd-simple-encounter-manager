import { InitiativeEntityState, InitiativeMoveDirection } from './types';

export const sortEntitiesByInitiative = (entities: InitiativeEntityState[]): InitiativeEntityState[] =>
  entities
    .slice()
    .sort((a: InitiativeEntityState, b: InitiativeEntityState) => {
      if (a.initiative === null && b.initiative === null) {
        return 0;
      }

      if (a.initiative && b.initiative === null) {
        return -1;
      }

      if (a.initiative === null && b.initiative) {
        return 1;
      }

      // Stupid TypeScript
      return (b.initiative as number) - (a.initiative as number);
    })
    // This is somewhat lazy, lol
    .map((entity, index) => ({ ...entity, order: index }));

export const calculatePlacementSwapValues = (
  entities: InitiativeEntityState[],
  id: string,
  direction: InitiativeMoveDirection,
): null | { current: InitiativeEntityState; neighbour: InitiativeEntityState } => {
  const current = entities.find((entity) => entity.id === id);
  // Stupid null check derp
  if (typeof current === 'undefined') {
    return null;
  }

  const neighbourOrderValue = direction === InitiativeMoveDirection.UP ? current.order - 1 : current.order + 1;
  const neighbourEntity = entities.find((entity) => entity.order === neighbourOrderValue);
  if (!neighbourEntity) {
    return null;
  }

  return {
    current: current,
    neighbour: {
      ...neighbourEntity,
      order: neighbourOrderValue,
    },
  };
};
