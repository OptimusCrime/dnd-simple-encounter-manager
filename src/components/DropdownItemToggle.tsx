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
    <li>
      <a onClick={onClick} className={cx('rounded no-underline py-2 my-1', className)} role="menuitem">
        {children}
      </a>
    </li>
  );
};
