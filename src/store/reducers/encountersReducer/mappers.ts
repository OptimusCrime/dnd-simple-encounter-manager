import { nanoid } from 'nanoid';

import { calculateHealth } from '../../../utilities/calculateHealth';
import { AddMonsterPayload } from './reducerTypes';
import { Monster } from './types';

export const mapNewMonster = (monster: AddMonsterPayload): Monster[] => {
  const { name, startHealth, clones, notes } = monster;

  const newMonsters: Monster[] = [];

  for (let i = 0; i < clones; i++) {
    newMonsters.push({
      id: nanoid(),
      name: name,
      startHealth: calculateHealth(startHealth),
      notes: notes,
    });
  }

  return newMonsters;
};
