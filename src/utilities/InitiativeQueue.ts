import { EncounterPlayEntity } from '../store/reducers/encounterPlayReducer';

/**
 * This is a weird attempt at creating a circular linked list in JavaScript...
 */
export class InitiativeQueue {
  private readonly list: Element[];

  constructor(entities: EncounterPlayEntity[]) {
    const numEntities = entities.length;
    const list: Element[] = [];

    for (let i = 0; i < numEntities; i++) {
      const entity = entities[i];

      const isFirstElement = i === 0;
      const isLastElement = i + 1 === numEntities;

      // If the first element in the list, the parent is the last element of the array
      const parent = isFirstElement ? entities[numEntities - 1] : entities[i - 1];

      // For the last element in the list, the child is the first element of the array
      const child = isLastElement ? entities[0] : entities[i + 1];

      list.push(
        new Element({
          id: entity.id,
          enabled: !entity.isDead,
          parent: parent.id,
          child: child.id,
          isFirstElement: isFirstElement,
          isLastElement: isLastElement,
        }),
      );
    }

    this.list = list;
  }

  findNextTurn(id: string): null | Element {
    return this.find(id, 'up');
  }

  findPreviousTurn(id: string): null | Element {
    return this.find(id, 'down');
  }

  /**
   * Finds the next entity in the circular list.
   *
   * - If the direction is 'up', we move forward, and find the next child.
   * - If the direction is 'down', we move backwards, and find the parent.
   *
   * @param id
   * @param direction
   */
  find(id: string, direction: 'up' | 'down'): null | Element {
    // Sanity check. Make sure that not all entities are dead!
    const allDead = this.list.every((element) => !element.enabled);
    if (allDead) {
      return null;
    }

    const currentTurnEntity = this.list.find((element) => element.id === id);
    if (!currentTurnEntity) {
      return null;
    }

    // Let's keep track of where we started to avoid crashing the page
    const currentId = id;

    let nextEntityId = direction === 'up' ? currentTurnEntity.child : currentTurnEntity.parent;

    while (true) {
      const nextEntityFind = this.list.find((element) => element.id === nextEntityId);
      if (!nextEntityFind) {
        // This should be impossible
        return null;
      }

      if (nextEntityFind.enabled) {
        return nextEntityFind;
      }

      nextEntityId = direction === 'up' ? nextEntityFind.child : nextEntityFind.parent;

      if (nextEntityId === currentId) {
        // If we got here, we must have gone in a circle. Return to avoid crashing the page.
        return null;
      }
    }
  }
}

class Element {
  readonly id: string;
  readonly enabled: boolean;
  readonly parent: string;
  readonly child: string;
  readonly isFirstElement: boolean;
  readonly isLastElement: boolean;

  constructor(params: {
    id: string;
    enabled: boolean;
    parent: string;
    child: string;
    isFirstElement: boolean;
    isLastElement: boolean;
  }) {
    const { id, enabled, parent, child, isFirstElement, isLastElement } = params;

    this.id = id;
    this.enabled = enabled;
    this.parent = parent;
    this.child = child;
    this.isFirstElement = isFirstElement;
    this.isLastElement = isLastElement;
  }
}
