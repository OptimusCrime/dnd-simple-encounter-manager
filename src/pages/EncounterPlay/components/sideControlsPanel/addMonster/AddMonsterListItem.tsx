import { AddMonsterListItemEntity } from './types';

interface AddMonsterListItemProps {
  entity: AddMonsterListItemEntity;
  number: number;
}

export const AddMonsterListItem = (props: AddMonsterListItemProps) => {
  const { entity, number } = props;

  const { addedMonster, name, currentTurn, initiativeThrow } = entity;

  if (addedMonster) {
    return (
      <>
        {number}. {name}
      </>
    );
  }

  return (
    <>
      {number}. {name} {currentTurn ? '[Current turn]' : ''} (initiative: {initiativeThrow ?? <i>None</i>})
    </>
  );
};
