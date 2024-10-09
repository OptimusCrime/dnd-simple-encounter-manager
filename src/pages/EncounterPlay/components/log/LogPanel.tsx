import React from 'react';

import { useAppSelector } from '../../../../store/hooks';
import { ReducerNames } from '../../../../store/reducers/reducerNames';

export const LogPanel = () => {
  const { logs } = useAppSelector((state) => state[ReducerNames.ENCOUNTER_PLAY]);

  return (
    <div>
      <h4 className="text-2xl pb-2">Log</h4>
      <div>
        <div className="card bg-neutral text-neutral-content card-compact">
          <div className="card-body p-4">
            <div className="overflow-y-scroll h-16">
              {logs
                .slice()
                .reverse()
                .map((log) => (
                  <p className={log.className ?? ''}>{log.text}</p>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
