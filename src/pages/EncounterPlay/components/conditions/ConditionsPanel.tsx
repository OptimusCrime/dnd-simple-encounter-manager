import React from 'react';

import { Condition } from '../../../../store/reducers/encounterPlayReducer';
import { ConditionsPanelItem } from './ConditionsPanelItem';

interface ConditionsPanelProps {
  conditions: Condition[];
}

export const ConditionsPanel = (props: ConditionsPanelProps) => {
  const { conditions } = props;

  if (conditions.length === 0) {
    return <i>None</i>;
  }

  return (
    <>
      {conditions.map((condition, index) => (
        <>
          {index > 0 && ', '}
          <ConditionsPanelItem key={index} condition={condition} />
        </>
      ))}
    </>
  );
};
