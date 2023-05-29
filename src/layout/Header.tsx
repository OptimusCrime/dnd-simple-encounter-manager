import React from 'react';

import { useAppDispatch } from '../store/hooks';
import { Page, setPage } from '../store/reducers/globalReducer';

const pages: { text: string; identifier: Page }[] = [
  {
    text: 'Encounters',
    identifier: Page.ENCOUNTERS,
  },
  {
    text: 'Characters',
    identifier: Page.CHARACTERS,
  },
  {
    text: 'Settings',
    identifier: Page.SETTINGS,
  },
];

export const Header = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="navbar p-0 mb-4">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 bg-base-100 rounded-box">
            {pages.map(({ text, identifier }) => (
              <li key={identifier}>
                <a onClick={() => dispatch(setPage(identifier))}>{text}</a>
              </li>
            ))}
          </ul>
        </div>
        <a
          href="#"
          className="normal-case text-xl"
          onClick={(e) => {
            e.preventDefault();

            dispatch(setPage(Page.ENCOUNTERS));
          }}
        >
          DnD Simple Combat Management
        </a>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal">
          {pages.map(({ text, identifier }) => (
            <li key={identifier}>
              <a onClick={() => dispatch(setPage(identifier))}>{text}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
