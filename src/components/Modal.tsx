import React from 'react';

interface ModalProps {
  id: string;
  children: React.ReactNode;
}

export const Modal = (props: ModalProps) => {
  const { id, children } = props;

  return (
    <dialog className="modal" id={id}>
      <div className="modal-box">{children}</div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};
