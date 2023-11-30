import cx from 'classnames';
import React from 'react';

interface DropdownProps {
  text: string;
  className?: string;
  children: React.ReactNode;
  onOpen?: () => void;
}

export const Dropdown = (props: DropdownProps) => {
  const { text, children, onOpen, className } = props;
  return (
    <div className="dropdown">
      <label tabIndex={0} className={cx('btn', className ?? '')} onClick={onOpen}>
        {text}
      </label>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-4 bg-base-100 shadow rounded-box w-52">
        {children}
      </ul>
    </div>
  );
};
