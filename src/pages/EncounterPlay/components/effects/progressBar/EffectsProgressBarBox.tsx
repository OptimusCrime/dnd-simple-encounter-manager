import cx from 'classnames';
import React from 'react';

interface EffectsProgressbarBoxProps {
  onClick: () => void;
  index: number;
  box: number;
  size: number;
}

export const EffectsProgressbarBox = (props: EffectsProgressbarBoxProps) => {
  const { onClick, index, box, size } = props;

  const colorClassName = box !== 0 ? 'bg-[#1f2f1e]' : '';
  const paddingClassName = index !== 0 ? 'border-l-0' : '';

  return (
    <div
      className={cx('h-[20px] block border-2 border-[#152514] cursor-pointer', colorClassName, paddingClassName)}
      style={{ width: `${size}%` }}
      onClick={onClick}
    />
  );
};
