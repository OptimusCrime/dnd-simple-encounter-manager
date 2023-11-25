import cx from 'classnames';
import React, { useState } from 'react';

import { Heading } from '../../components';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { beginEncounter } from '../../store/reducers/encounterPlayReducer';
import { Page, setPage } from '../../store/reducers/globalReducer';
import { ReducerNames } from '../../store/reducers/reducerNames';
import { showModal } from '../../utilities/modal';
import { InitialDamageTakenInputField, InitiativeInputField, NoSortingWarningModal, SortingArrows } from './components';
import { mapEncounterToInitiativeState } from './mappers';
import { InitiativeEntityState, InitiativeMoveDirection } from './types';
import { calculatePlacementSwapValues, sortEntitiesByInitiative } from './utilities';

const NO_SORTING_WARNING_MODAL_ID = 'no_sorting_warning_modal_id';

export const EncounterInitiative = () => {
  const dispatch = useAppDispatch();

  const { encounters, selectedEncounter } = useAppSelector((state) => state[ReducerNames.ENCOUNTERS]);
  const { characters } = useAppSelector((state) => state[ReducerNames.CHARACTERS]);

  const encounter = encounters.find((encounter) => encounter.id === selectedEncounter) ?? null;

  const [hasSorted, setHasSorted] = useState<boolean>(false);
  const [state, setState] = useState<InitiativeEntityState[]>(mapEncounterToInitiativeState(encounter, characters));

  if (encounter === null) {
    dispatch(setPage(Page.ENCOUNTERS_LIST));
    return <div />;
  }

  const { name } = encounter;

  const updateState = (id: string, data: Partial<InitiativeEntityState>) => {
    setState((prevState) => {
      return prevState.map((prevEntityState) => {
        if (prevEntityState.id !== id) {
          return prevEntityState;
        }

        return {
          ...prevEntityState,
          ...data,
        };
      });
    });
  };

  const moveEntityUpOrDownCallback = (id: string, direction: InitiativeMoveDirection) => {
    const swapValues = calculatePlacementSwapValues(state, id, direction);
    if (!swapValues) {
      return;
    }

    const { current, neighbour } = swapValues;

    // Simply swap the values
    updateState(id, {
      order: neighbour.order,
    });
    updateState(neighbour.id, {
      order: current.order,
    });
  };

  const sortBasedOnInitiativeValuesCallback = () => {
    // Make sure that the warning box does not appear
    setHasSorted(true);

    setState(sortEntitiesByInitiative(state));
  };

  const numberOfEntities = state.length;
  const sortedState = state.slice().sort((a, b) => a.order - b.order);

  const startEncounterCallback = () => {
    dispatch(
      beginEncounter({
        name: name,
        entities: sortedState,
      }),
    );
    dispatch(setPage(Page.ENCOUNTER_COMBAT));
  };

  // TODO: Create component for each entity too?
  return (
    <div>
      <Heading text={name} />
      <ul>
        {sortedState.map((entity, idx) => (
          <li key={entity.id}>
            <div className="card bg-neutral text-neutral-content mb-4" key={entity.id}>
              <div className="card-body flex flex-row justify-between p-2 items-center">
                <div className="flex flex-row">
                  <div className="flex items-center ml-8 mr-16 w-64">
                    <span>{`${entity.name} ${entity.isPlayerCharacter ? '' : `(${entity.startHealth} HP)`}`}</span>
                  </div>
                  <div className="flex flex-row items-end">
                    <InitiativeInputField entity={entity} idx={idx} updateState={updateState} key={idx} />

                    <div className="pl-8 w-64 block">
                      <InitialDamageTakenInputField entity={entity} key={idx} updateState={updateState} />
                    </div>

                    <div className="flex flex-row ml-16">
                      <div className="form-control">
                        <label className="label cursor-pointer">
                          <span className="label-text text-lg mr-4">Surprised</span>
                          <input
                            type="checkbox"
                            className={cx('toggle', entity.isSurprised ? 'toggle-warning' : '')}
                            defaultChecked={entity.isSurprised}
                            tabIndex={-1}
                            onChange={(event) => {
                              updateState(entity.id, {
                                isSurprised: event.target.checked,
                              });
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <SortingArrows
                  entity={entity}
                  numberOfEntities={numberOfEntities}
                  moveEntityUpOrDownCallback={moveEntityUpOrDownCallback}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-between pt-4">
        <button className="btn btn-info" onClick={sortBasedOnInitiativeValuesCallback}>
          Update sort
        </button>

        <button
          className="btn btn-success"
          onClick={() => {
            if (hasSorted) {
              return startEncounterCallback();
            }

            showModal(NO_SORTING_WARNING_MODAL_ID);
          }}
        >
          Begin encounter
        </button>
      </div>
      <NoSortingWarningModal
        id={NO_SORTING_WARNING_MODAL_ID}
        startEncounter={() => {
          startEncounterCallback();
        }}
      />
    </div>
  );
};
