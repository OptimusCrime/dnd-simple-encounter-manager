import cx from 'classnames';
import React from 'react';

interface DropdownItemToggleProps {
  checked: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export const DropdownItemToggle = (props: DropdownItemToggleProps) => {
  const { checked, onClick, children } = props;

  const className = checked ? 'bg-base-300' : '';

  return (
    <li className={cx('rounded', className)}>
      <a onClick={onClick} className="rounded no-underline">
        {children}
      </a>
    </li>
  );
};
