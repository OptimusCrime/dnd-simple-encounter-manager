import React from 'react';

import { Modal } from '../../../components';
import { hideModal } from '../../../utilities/modal';

interface NoSortingWarningProps {
  id: string;
  startEncounter: () => void;
}

export const NoSortingWarningModal = (props: NoSortingWarningProps) => {
  const { id, startEncounter } = props;

  return (
    <Modal id={id}>
      <h3 className="font-bold text-lg">You have not sorted the the encounter yet</h3>
      <p className="py-4">Are you sure that you want to start?</p>

      <div className="flex flex-row space-x-4 justify-end">
        <button className="btn" onClick={startEncounter}>
          Start
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            hideModal(id);
          }}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};
