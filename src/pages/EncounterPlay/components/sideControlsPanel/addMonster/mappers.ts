import { EncounterPlayEntity } from '../../../../../store/reducers/encounterPlayReducer';
import { AddMonsterListItemEntity } from './types';

export const mapEntitiesToList = (entities: EncounterPlayEntity[], currentTurn: string): AddMonsterListItemEntity[] =>
  entities.map((entity) => ({
    name: entity.name,
    initiativeThrow: entity.initiativeThrow,
    currentTurn: entity.id === currentTurn,
    addedMonster: false,
  }));

export const mapNewMonsterToList = (name: string): AddMonsterListItemEntity => ({
  name: name,
  initiativeThrow: null,
  currentTurn: false,
  addedMonster: true,
});
