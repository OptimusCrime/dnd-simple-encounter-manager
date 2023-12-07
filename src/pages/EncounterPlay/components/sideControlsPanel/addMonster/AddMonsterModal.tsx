import cx from 'classnames';
import React, { useState } from 'react';

import { Modal } from '../../../../../components';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import { addNewMonster } from '../../../../../store/reducers/encounterPlayReducer';
import { ReducerNames } from '../../../../../store/reducers/reducerNames';
import { hideModal } from '../../../../../utilities/modal';
import { AddMonsterListItem } from './AddMonsterListItem';
import { createEntityListWithMonster } from './utilities';

export const ADD_MONSTER_MODAL_ID = 'add_monster_modal_id';

const MONSTER_NAME_FORM_ID = 'add_monster_monster_name_form_id';
const MONSTER_HEALTH_FORM_ID = 'add_monster_monster_health_form_id';
const MONSTER_ORDER_FORM_ID = 'add_monster_monster_order_form_id';

export const AddMonsterModal = () => {
  const dispatch = useAppDispatch();

  const { entities, currentTurn } = useAppSelector((state) => state[ReducerNames.ENCOUNTER_PLAY]);

  const [monsterName, setMonsterName] = useState('');
  const [monsterHealth, setMonsterHealth] = useState('');
  const [monsterOrder, setMonsterOrder] = useState<null | number>(null);

  const formValid = monsterName.length > 0 && monsterHealth.length > 0 && monsterOrder !== null;

  const submit = () => {
    dispatch(
      addNewMonster({
        name: monsterName,
        health: monsterHealth,
        order: monsterOrder as number,
      }),
    );

    setMonsterName('');
    setMonsterHealth('');
    setMonsterOrder(null);

    (document.getElementById(MONSTER_NAME_FORM_ID) as HTMLInputElement).value = '';
    (document.getElementById(MONSTER_HEALTH_FORM_ID) as HTMLInputElement).value = '';
    (document.getElementById(MONSTER_HEALTH_FORM_ID) as HTMLSelectElement).selectedIndex = 0;
    hideModal(ADD_MONSTER_MODAL_ID);
  };

  const entitiesListWithPotentiallyNewMonster = createEntityListWithMonster({
    entities: entities,
    currentTurn: currentTurn,
    addMonster: formValid,
    monsterName: monsterName,
    monsterOrder: monsterOrder,
  });

  const options = Array.from({ length: entities.length + 1 }, (_, i) => i + 1);

  const btnClassName = formValid ? '' : 'btn-disabled';

  return (
    <Modal id={ADD_MONSTER_MODAL_ID}>
      <h3 className="font-bold text-lg">Add monster</h3>
      <div className="flex flex-col space-y-4 pt-4">
        <div className="flex flex-col space-y-4">
          <div className="form-control w-full">
            <label className="label" htmlFor={MONSTER_NAME_FORM_ID}>
              <span className="label-text">Monster name</span>
            </label>
            <input
              id={MONSTER_NAME_FORM_ID}
              type="text"
              className="input input-bordered w-full"
              defaultValue=""
              onChange={(event) => setMonsterName(event.target.value)}
            />
          </div>

          <div className="form-control w-full">
            <label className="label" htmlFor={MONSTER_HEALTH_FORM_ID}>
              <span className="label-text">Monster start health (e.g. 2d6 + 2)</span>
            </label>
            <input
              id={MONSTER_HEALTH_FORM_ID}
              type="text"
              className="input input-bordered w-full"
              defaultValue=""
              onChange={(event) => setMonsterHealth(event.target.value)}
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Select placement</span>
            </label>
            <select
              id={MONSTER_ORDER_FORM_ID}
              className="select select-bordered"
              disabled={monsterName.length === 0 && monsterHealth.length === 0}
              onChange={(event) => {
                const value = parseInt(event.target.value);
                if (value !== 0) {
                  setMonsterOrder(value);
                }
              }}
              defaultValue="0"
            >
              <option disabled value="0">
                --
              </option>
              {options.map((option) => (
                <option value={option} key={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        {entitiesListWithPotentiallyNewMonster.length > 0 && (
          <div>
            <ul className="mt-3 p-2 bg-base-100 rounded-box">
              {entitiesListWithPotentiallyNewMonster.map((entity, index) => (
                <li key={index}>
                  <AddMonsterListItem entity={entity} number={index + 1} />
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex flex-row space-x-4 justify-end">
          <button className="btn" onClick={() => hideModal(ADD_MONSTER_MODAL_ID)}>
            Close
          </button>
          <button className={cx('btn btn-info', btnClassName)} onClick={submit}>
            Add monster
          </button>
        </div>
      </div>
    </Modal>
  );
};
