import { DropdownItemToggle } from '../../../../components';
import { useAppDispatch } from '../../../../store/hooks';
import {
  addOrDeleteEffectAffected,
  EncounterPlayEffect,
  EncounterPlayEntity,
} from '../../../../store/reducers/encounterPlayReducer';

interface ChangeAffectedByEffectDropdownItemProps {
  effect: EncounterPlayEffect;
  entity: EncounterPlayEntity;
}

export const ChangeAffectedByEffectDropdownItem = (props: ChangeAffectedByEffectDropdownItemProps) => {
  const dispatch = useAppDispatch();

  const { entity, effect } = props;

  const checked = effect.affected.includes(entity.id);

  const onClick = () => {
    dispatch(
      addOrDeleteEffectAffected({
        id: effect.id,
        affected: {
          id: entity.id,
          name: entity.name,
          enabled: !checked,
        },
      }),
    );
  };

  return (
    <DropdownItemToggle checked={checked} onClick={onClick}>
      {entity.name} ({entity.number})
    </DropdownItemToggle>
  );
};
