import { nanoid } from 'nanoid';

import { calculateHealth } from '../../../utilities/calculateHealth';
import { AddMonsterPayload } from './reducerTypes';
import { Monster } from './types';

export const mapDuplicateMonster = (monster: Monster): Monster => {
  const { name, startHealthExpression, notes } = monster;

  return {
    id: nanoid(),
    name: name,
    startHealth: calculateHealth(startHealthExpression ?? ''),
    startHealthExpression: startHealthExpression,
    notes: notes,
  };
};

export const mapNewMonster = (monster: AddMonsterPayload): Monster[] => {
  const { name, startHealth, clones, notes } = monster;

  const newMonsters: Monster[] = [];

  for (let i = 0; i < clones; i++) {
    newMonsters.push({
      id: nanoid(),
      name: name,
      startHealth: calculateHealth(startHealth),
      startHealthExpression: startHealth,
      notes: notes,
    });
  }

  return newMonsters;
};
