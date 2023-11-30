import cx from 'classnames';
import React from 'react';

import { useAppDispatch } from '../../../store/hooks';
import { EncounterPlayEntity, nextRound, previousRound } from '../../../store/reducers/encounterPlayReducer';
import { ActiveConditionDescriptionModal, ConditionsAndEffectsPanel, ConditionsDropdown } from './conditions';
import { ChangeHealthPanel } from './health';
import { NamePanel } from './NamePanel';

interface EntityProps {
  entity: EncounterPlayEntity;
  index: number;
  currentTurn: string;
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

  const { entity, currentTurn, index } = props;

  const className = getBackgroundColor(entity, currentTurn);

  return (
    <div className={cx('card text-neutral-content card-compact', className)}>
      <div className="card-body">
        <div key={entity.id} className="space-y-4">
          <div className="w-full flex flex-row justify-start">
            <div className="min-w-[15rem]">
              <NamePanel entity={entity} index={index} />
            </div>

            <div className="divider divider-horizontal" />

            <div className="flex-grow">
              <ActiveConditionDescriptionModal />
              <ConditionsAndEffectsPanel entity={entity} />
            </div>

            <div className="divider divider-horizontal" />

            <div className="flex flex-col justify-end">
              <ConditionsDropdown entity={entity} />
            </div>
          </div>
          <div className="w-full flex flex-row justify-between">
            <div className="flex flex-row flex-grow">
              <ChangeHealthPanel entity={entity} />
            </div>
            <div className="flex flex-row justify-end">
              {entity.id === currentTurn && (
                <>
                  <div className="space-x-4">
                    <button className="btn btn-info" onClick={() => dispatch(previousRound())}>
                      Previous
                    </button>
                    <button className="btn btn-info" onClick={() => dispatch(nextRound())}>
                      Next
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
