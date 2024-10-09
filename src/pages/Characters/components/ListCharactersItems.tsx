import React from 'react';

import { useAppDispatch } from '../../../store/hooks';
import { removeCharacter } from '../../../store/reducers/characterReducer';
import { CharacterSet } from '../../../store/reducers/characterReducer/types';

interface ListCharactersItemsProps {
  currentSet: CharacterSet;
}
export const ListCharactersItems = (props: ListCharactersItemsProps) => {
  const dispatch = useAppDispatch();

  const { currentSet } = props;

  if (currentSet.characters.length === 0) {
    return <p className="prose-md">No characters in set.</p>;
  }

  const { characters, id } = currentSet;

  return (
    <ul className="list-none p-0">
      {characters.map((character) => (
        <li key={character} className="my-2">
          <div className="flex items-center">
            <button
              className="btn btn-sm btn-circle btn-outline btn-ghost my-0 mr-4"
              onClick={() =>
                dispatch(
                  removeCharacter({
                    set: id,
                    character: character,
                  }),
                )
              }
            >
              <svg
                className="w-5 h-5 fill-error hover:fill-base-100"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
              >
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
              </svg>
            </button>
            <span>{character}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};
