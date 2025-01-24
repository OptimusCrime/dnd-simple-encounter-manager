import cx from 'classnames';
import React from 'react';

import { useAppDispatch } from '../../../store/hooks';
import {
  EncounterPlayEffect,
  EncounterPlayEntity,
  nextRound,
  previousRound,
} from '../../../store/reducers/encounterPlayReducer';
import { ActiveConditionDescriptionModal, ConditionsDropdown } from './conditions';
import { ConditionsAndEffectsPanel, findEffectsForEntity } from './ConditionsAndEffectsPanel';
import { ChangeHealthPanel } from './health';
import { NamePanel } from './NamePanel';
import { Notes } from './notes/Notes';

interface EntityProps {
  entity: EncounterPlayEntity;
  currentTurn: string;
  effects: EncounterPlayEffect[];
}

const getBackgroundColor = (entity: EncounterPlayEntity, currentTurn: string): string => {
  if (entity.isDead) {
    return 'bg-[#422625]';
  }
  if (entity.id === currentTurn) {
    return 'bg-[#1f2f1e]';
  }

  return 'bg-neutral';
};

export const Entity = (props: EntityProps) => {
  const dispatch = useAppDispatch();

  const { entity, currentTurn, effects } = props;

  const className = getBackgroundColor(entity, currentTurn);
  const effectsForEntity = findEffectsForEntity(effects, entity);
  const conditionsForEntity = entity.conditions;
  const hasEffectsOrConditions = effectsForEntity.length > 0 || conditionsForEntity.length > 0;

  return (
    <div className={cx('card text-neutral-content card-compact', className)}>
      <div className="card-body">
        <div key={entity.id} className="">
          <div className="w-full flex flex-row justify-between">
            <div className="w-auto">
              <NamePanel entity={entity} />
            </div>

            <div className="flex flex-row">
              {!entity.isPlayerCharacter && (
                <>
                  <div className="divider divider-horizontal" />

                  <ChangeHealthPanel entity={entity} />
                </>
              )}

              <div className="divider divider-horizontal" />

              <div className="flex flex-col">
                <ConditionsDropdown entity={entity} />
              </div>

              <div className="divider divider-horizontal" />

              <div className={cx('flex flex-row justify-end', { invisible: entity.id !== currentTurn })}>
                <div className="space-x-4">
                  <button className="btn btn-info" onClick={() => dispatch(previousRound())}>
                    Previous
                  </button>
                  <button className="btn btn-info" onClick={() => dispatch(nextRound())}>
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>

          {(hasEffectsOrConditions || entity.notes !== null) && (
            <>
              {hasEffectsOrConditions && (
                <>
                  <div className="divider my-2" />
                  <ActiveConditionDescriptionModal />
                  <div className="flex bg-base-100 p-4 rounded-lg border-neutral-content/30 border-2">
                    <ConditionsAndEffectsPanel effects={effectsForEntity} conditions={conditionsForEntity} />
                  </div>
                </>
              )}

              {entity.notes !== null && (
                <>
                  <div className="divider my-2" />
                  <div className="flex bg-base-100 p-4 rounded-lg border-neutral-content/30 border-2">
                    <Notes entity={entity} />
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
