import React from 'react';

import { Content } from '../../layout/Content';
import { ReducerNames } from '../../store/reducers/reducerNames';
import { deleteKey } from '../../utilities/localStorage';
import { unreachableCode } from '../../utilities/unreachableCode';

enum CacheDeleteTarget {
  ENCOUNTERS,
  CHARACTERS,
  ALL,
}

export const Settings = () => {
  const deleteCache = (target: CacheDeleteTarget) => {
    switch (target) {
      case CacheDeleteTarget.CHARACTERS:
        deleteKey(ReducerNames.CHARACTERS);
        break;
      case CacheDeleteTarget.ENCOUNTERS:
        deleteKey(ReducerNames.ENCOUNTERS);
        break;
      case CacheDeleteTarget.ALL:
        deleteKey(ReducerNames.GLOBAL);
        deleteKey(ReducerNames.CHARACTERS);
        deleteKey(ReducerNames.ENCOUNTERS);
        deleteKey(ReducerNames.ENCOUNTER_PLAY);
        break;
      default:
        unreachableCode(target);
    }

    // Derp, let us also reload the page
    window.location.reload();
  };

  return (
    <Content title="Clear local cache">
      <div className="card bg-neutral text-neutral-content card-compact">
        <div className="card-body">
          <div className="card-actions flex justify-between">
            <button className="btn bg-base-100" onClick={() => deleteCache(CacheDeleteTarget.ENCOUNTERS)}>
              Delete encounters
            </button>
            <button className="btn bg-base-100" onClick={() => deleteCache(CacheDeleteTarget.CHARACTERS)}>
              Delete characters
            </button>
            <button className="btn bg-base-100" onClick={() => deleteCache(CacheDeleteTarget.ALL)}>
              Delete all
            </button>
          </div>
        </div>
      </div>
    </Content>
  );
};
