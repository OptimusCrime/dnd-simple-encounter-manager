import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { calculateHealth } from '../../utilities/calculateHealth';
import { findMaxId } from '../../utilities/findMaxId';
import { getItem } from '../../utilities/localStorage';
import { ReducerNames } from './reducerNames';

interface AddMonsterPayload {
  name: string;
  startHealth: string;
  clones: number;
}

const mapPlayersToEntities = (entities: Entity[], players: string[]): Entity[] => {
  let maxId = findMaxId(entities);

  return players.map((player, index) => ({
    id: maxId + 1 + index,
    name: player,
    isPlayerCharacter: true,
    startHealth: null,
  }));
};

const mapMonsterToEntity = (entities: Entity[], monster: AddMonsterPayload): Entity[] => {
  let maxId = findMaxId(entities);

  const { name, startHealth, clones } = monster;

  const newMonsters: Entity[] = [];

  for (let i = 0; i < clones; i++) {
    newMonsters.push({
      id: maxId + 1 + i,
      name: name,
      isPlayerCharacter: false,
      startHealth: calculateHealth(startHealth),
    });
  }

  return newMonsters;
};

export interface Entity {
  id: number;
  name: string;
  isPlayerCharacter: boolean;
  startHealth: number | null;
}

export interface Encounter {
  id: number;
  name: string;
  ready: boolean;
  finished: boolean;
  entities: Entity[];
}

interface EncountersState {
  selectedEncounter: null | number;
  encounters: Encounter[];
}

const fallbackInitialState: EncountersState = {
  selectedEncounter: null,
  encounters: [],
};

const getInitialState = (): EncountersState => {
  const localStorage = getItem<EncountersState>(ReducerNames.ENCOUNTERS);
  if (localStorage) {
    return {
      ...fallbackInitialState,
      ...localStorage,
    };
  }

  return fallbackInitialState;
};

const encountersReducer = createSlice({
  name: ReducerNames.ENCOUNTERS,
  initialState: getInitialState(),
  reducers: {
    selectEncounter(state, action: PayloadAction<number | null>) {
      state.selectedEncounter = action.payload;
    },
    addEncounter(state, action: PayloadAction<{ name: string; players: string[] }>) {
      const maxId = Math.max(-1, ...state.encounters.map((encounter) => encounter.id));
      state.encounters.push({
        id: maxId + 1,
        name: action.payload.name,
        ready: false,
        finished: false,
        entities: mapPlayersToEntities([], action.payload.players),
      });
    },
    removeEncounter(state, action: PayloadAction<number>) {
      state.encounters = state.encounters.filter((encounter) => encounter.id !== action.payload);
    },
    updateEncounterName(state, action: PayloadAction<string>) {
      state.encounters = state.encounters.map((encounter) => {
        if (state.selectedEncounter !== encounter.id) {
          return encounter;
        }

        return {
          ...encounter,
          name: action.payload,
        };
      });
    },
    removeEntity(state, action: PayloadAction<number>) {
      state.encounters = state.encounters.map((encounter) => {
        if (state.selectedEncounter !== encounter.id) {
          return encounter;
        }

        return {
          ...encounter,
          entities: encounter.entities.filter((entity) => entity.id !== action.payload),
        };
      });
    },
    addPlayerCharacters(state, action: PayloadAction<{ encounter: number; players: string[] }>) {
      state.encounters = state.encounters.map((encounter) => {
        if (encounter.id !== action.payload.encounter) {
          return encounter;
        }

        return {
          ...encounter,
          entities: [...encounter.entities, ...mapPlayersToEntities(encounter.entities, action.payload.players)],
        };
      });
    },
    setFinishedValue(state, action: PayloadAction<boolean>) {
      state.encounters = state.encounters.map((encounter) => {
        if (state.selectedEncounter !== encounter.id) {
          return encounter;
        }

        return {
          ...encounter,
          finished: action.payload,
          // Reset ready if encounter is finished
          ready: action.payload ? false : action.payload,
        };
      });
    },
    setReadyValue(state, action: PayloadAction<boolean>) {
      state.encounters = state.encounters.map((encounter) => {
        if (state.selectedEncounter !== encounter.id) {
          return encounter;
        }

        return {
          ...encounter,
          ready: action.payload,
        };
      });
    },
    addMonster(state, action: PayloadAction<AddMonsterPayload>) {
      state.encounters = state.encounters.map((encounter) => {
        if (state.selectedEncounter !== encounter.id) {
          return encounter;
        }

        return {
          ...encounter,
          entities: [...encounter.entities, ...mapMonsterToEntity(encounter.entities, action.payload)],
        };
      });
    },
  },
});

export const {
  selectEncounter,
  addEncounter,
  removeEncounter,
  updateEncounterName,
  removeEntity,
  addPlayerCharacters,
  setFinishedValue,
  setReadyValue,
  addMonster,
} = encountersReducer.actions;

export default encountersReducer.reducer;
