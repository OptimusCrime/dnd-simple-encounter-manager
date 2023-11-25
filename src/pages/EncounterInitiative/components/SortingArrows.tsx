import cx from 'classnames';
import React from 'react';

import { InitiativeEntityState, InitiativeMoveDirection } from '../types';

interface SortingArrowsProps {
  numberOfEntities: number;
  entity: InitiativeEntityState;
  moveEntityUpOrDownCallback: (id: string, direction: InitiativeMoveDirection) => void;
}

export const SortingArrows = (props: SortingArrowsProps) => {
  const { entity, numberOfEntities, moveEntityUpOrDownCallback } = props;

  const sortArrowUpClassName = entity.order + 1 !== numberOfEntities ? '' : 'btn-disabled';
  const sortArrowDownClassName = entity.order > 0 ? '' : 'btn-disabled';

  return (
    <div className="flex align-center">
      <button
        className={cx('btn btn-sm btn-circle btn-outline btn-ghost my-0 mr-4', sortArrowUpClassName)}
        onClick={() => moveEntityUpOrDownCallback(entity.id, InitiativeMoveDirection.DOWN)}
        tabIndex={-1}
      >
        <svg className="w-5 h-5 fill-primary-content" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
          <path d="m20 12-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
        </svg>
      </button>
      <button
        className={cx('btn btn-sm btn-circle btn-outline btn-ghost my-0 mr-4', sortArrowDownClassName)}
        onClick={() => moveEntityUpOrDownCallback(entity.id, InitiativeMoveDirection.UP)}
        tabIndex={-1}
      >
        <svg className="w-5 h-5 fill-primary-content" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
          <path d="m4 12 1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
        </svg>
      </button>
    </div>
  );
};
