import React from 'react';

interface EffectsPanelWrapperProps {
  children: React.ReactNode;
}

export const EffectsPanelWrapper = (props: EffectsPanelWrapperProps) => {
  const { children } = props;
  return (
    <div>
      <h4 className="text-2xl pb-2">Active effects</h4>
      <div>{children}</div>
    </div>
  );
};
