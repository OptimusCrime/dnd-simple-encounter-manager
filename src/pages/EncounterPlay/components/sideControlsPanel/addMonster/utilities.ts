import { EncounterPlayEntity } from '../../../../../store/reducers/encounterPlayReducer';
import { mapEntitiesToList, mapNewMonsterToList } from './mappers';
import { AddMonsterListItemEntity } from './types';

export const createEntityListWithMonster = (params: {
  entities: EncounterPlayEntity[];
  currentTurn: string;
  addMonster: boolean;
  monsterName: string;
  monsterOrder: number | null;
}): AddMonsterListItemEntity[] => {
  const { entities, currentTurn, addMonster, monsterName, monsterOrder } = params;

  const mappedEntities = mapEntitiesToList(entities, currentTurn);

  if (monsterOrder === null) {
    return mappedEntities;
  }

  return addMonster
    ? [
        ...mappedEntities.slice(0, monsterOrder - 1),
        mapNewMonsterToList(monsterName),
        ...mappedEntities.slice(monsterOrder - 1),
      ]
    : mappedEntities;
};
