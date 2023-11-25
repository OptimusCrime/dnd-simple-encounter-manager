import React from 'react';

interface DropdownProps {
  text: string;
  children: React.ReactNode;
  onOpen?: () => void;
}

export const Dropdown = (props: DropdownProps) => {
  const { text, children, onOpen } = props;
  return (
    <div className="dropdown">
      <label tabIndex={0} className="btn" onClick={onOpen}>
        {text}
      </label>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-4 shadow bg-base-100 rounded-box w-52">
        {children}
      </ul>
    </div>
  );
};
