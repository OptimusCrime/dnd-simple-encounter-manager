import { DropdownItemToggle } from '../../../../components';
import { useAppDispatch } from '../../../../store/hooks';
import {
  changeEffectAnchor,
  EncounterPlayEffect,
  EncounterPlayEntity,
} from '../../../../store/reducers/encounterPlayReducer';

interface ChangeAnchorEffectDropdownItemProps {
  effect: EncounterPlayEffect;
  entity: EncounterPlayEntity;
}

export const ChangeAnchorEffectDropdownItem = (props: ChangeAnchorEffectDropdownItemProps) => {
  const dispatch = useAppDispatch();

  const { entity, effect } = props;

  const checked = effect.affected.includes(entity.id);

  const onClick = () => {
    dispatch(
      changeEffectAnchor({
        id: effect.id,
        anchor: entity.id,
      }),
    );
  };

  return (
    <DropdownItemToggle checked={checked} onClick={onClick}>
      {entity.name} {entity.number}
    </DropdownItemToggle>
  );
};
