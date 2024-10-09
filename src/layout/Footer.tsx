import React from 'react';

import { VERSION } from '../VERSION';

export const Footer = () => (
  <div className="container max-w-none bg-neutral mt-72">
    <div className="container h-12 flex flex-row justify-center items-center space-x-8">
      <span>DnD Simple Encounter Manager</span>
      <span>{VERSION}</span>
      <span>
        <a
          href="https://github.com/OptimusCrime/dnd-simple-encounter-manager"
          target="_blank"
          className="underline hover:no-underline"
          rel="noreferrer"
        >
          GitHub
        </a>
      </span>
    </div>
  </div>
);
