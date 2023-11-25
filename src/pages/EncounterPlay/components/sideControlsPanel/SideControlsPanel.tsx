import React from 'react';

import { showModal } from '../../../../utilities/modal';
import { ADD_LASTING_EFFECT_MODAL_ID, AddLastingEffectModal } from './AddLastingEffectModal';
import { ADD_MONSTER_MODAL_ID, AddMonsterModal } from './addMonster/AddMonsterModal';
import { ADD_TEMPORARY_EFFECT_MODAL_ID, AddTemporaryEffectModal } from './AddTemporaryEffectModal';

export const SideControlsPanel = () => {
  return (
    <div className="card bg-neutral text-neutral-content card-compact">
      <div className="card-body">
        <AddTemporaryEffectModal />
        <AddMonsterModal />
        <AddLastingEffectModal />
        <div className="card-actions flex justify-between">
          <button className="btn bg-base-100" onClick={() => showModal(ADD_TEMPORARY_EFFECT_MODAL_ID)}>
            Temp. effect
          </button>
          <button className="btn bg-base-100" onClick={() => showModal(ADD_MONSTER_MODAL_ID)}>
            Add monster
          </button>
          <button className="btn bg-base-100" onClick={() => showModal(ADD_LASTING_EFFECT_MODAL_ID)}>
            Lasting effect
          </button>
        </div>
      </div>
    </div>
  );
};
