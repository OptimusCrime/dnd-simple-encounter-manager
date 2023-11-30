import { Condition } from '../../../../store/reducers/encounterPlayReducer';

interface ActiveConditionDescriptionModalProps {
  condition: Condition | null;
}
export const ActiveConditionDescriptionModalContent = (props: ActiveConditionDescriptionModalProps) => {
  const { condition } = props;
  if (condition === null) {
    return null;
  }

  switch (condition) {
    case Condition.BLINDED:
      return (
        <>
          <p>
            A blinded creature can't see and automatically fails any <strong>ability check</strong> that requires sight.
          </p>
          <p>
            <strong>Attack rolls</strong> against the creature have <strong>advantage</strong>, and the creature's
            attack rolls have <strong>disadvantage</strong>.
          </p>
        </>
      );
    case Condition.CHARMED:
      return (
        <>
          <p>
            A charmed creature can't <strong>attack</strong> the charmer or target the charmer with harmful abilities or
            magical effects.
          </p>
          <p>
            The charmer has <strong>advantage</strong> on any <strong>ability check</strong> to interact socially with
            the creature.
          </p>
        </>
      );
    case Condition.DEAFENED:
      return (
        <>
          <p>
            A deafened creature can't hear and automatically fails any <strong>ability check</strong> that requires
            hearing.
          </p>
        </>
      );
    case Condition.FRIGHTENED:
      return (
        <>
          <p>
            A frightened creature has <strong>disadvantage</strong> on <strong>ability checks</strong> and{' '}
            <strong>attack rolls</strong> while the source of its fear is within line of sight.
          </p>
          <p>
            The creature can't willingly <strong>move</strong> closer to the source of its fear.
          </p>
        </>
      );
    case Condition.GRAPPLED:
      return (
        <>
          <p>
            A grappled creature's <strong>speed</strong> becomes 0, and it can't benefit from any bonus to its speed.
          </p>
          <p>
            The condition ends if the grappler is <strong>incapacitated</strong>.
          </p>
          <p>
            The condition also ends if an effect removes the grappled creature from the reach of the grappler or
            grappling effect, such as when a creature is hurled away by the thunderwave spell.
          </p>
        </>
      );
    case Condition.INCAPACITATED:
      return (
        <>
          <p>
            An incapacitated creature can't take <strong>actions</strong> or <strong>reactions</strong>.
          </p>
        </>
      );
    case Condition.INVISIBLE:
      return (
        <>
          <p>
            An invisible creature is impossible to see without the aid of magic or a special sense. For the purpose of{' '}
            <strong>hiding</strong>, the creature is heavily obscured. The creature's location can be detected by any
            noise it makes or any tracks it leaves.
          </p>
          <p>
            <strong>Attack rolls</strong> against the creature have <strong>disadvantage</strong>, and the creature's
            attack rolls have <strong>advantage</strong>.
          </p>
        </>
      );
    case Condition.PARALYZED:
      return (
        <>
          <p>
            A paralyzed creature is <strong>incapacitated</strong> and can't move or speak.
          </p>
          <p>
            The creature automatically fails <strong>Strength</strong> and <strong>Dexterity saving throws</strong>.
          </p>
          <p>
            <strong>Attack rolls</strong> against the creature have <strong>advantage</strong>.
          </p>
          <p>
            Any <strong>attack</strong> that hits the creature is a <strong>critical hit</strong> if the attacker is
            within 5 feet of the creature.
          </p>
        </>
      );
    case Condition.PETRIFIED:
      return (
        <>
          <p>
            A petrified creature is transformed, along with any nonmagical object it is wearing or carrying, into a
            solid inanimate substance (usually stone). Its weight increases by a factor of ten, and it ceases aging.
          </p>
          <p>
            The creature is <strong>incapacitated</strong>, can't move or speak, and is unaware of its surroundings.
          </p>
          <p>
            <strong>Attack rolls</strong> against the creature have <strong>advantage</strong>.
          </p>
          <p>
            The creature automatically fails <strong>Strength</strong> and <strong>Dexterity saving throws</strong>.
          </p>
          <p>
            The creature has <strong>resistance</strong> to all <strong>damage</strong>.
          </p>
          <p>
            The creature is immune to <strong>poison</strong> and <strong>disease</strong>, although a poison or disease
            already in its system is suspended, not neutralized.
          </p>
        </>
      );
    case Condition.POISONED:
      return (
        <>
          <p>
            A poisoned creature has <strong>disadvantage</strong> on <strong>attack rolls</strong> and{' '}
            <strong>ability checks</strong>.
          </p>
        </>
      );
    case Condition.PRONE:
      return (
        <>
          <p>
            A prone creature's only <strong>movement</strong> option is to <strong>crawl</strong>, unless it stands up
            and thereby ends the condition.
          </p>
          <p>
            The creature has <strong>disadvantage</strong> on <strong>attack rolls</strong>.
          </p>
          <p>
            An <strong>attack roll</strong> against the creature has <strong>advantage</strong> if the attacker is
            within 5 feet of the creature. Otherwise, the attack roll has <strong>disadvantage</strong>.
          </p>
        </>
      );
    case Condition.RESTRAINED:
      return (
        <>
          <p>
            A restrained creature's <strong>speed</strong> becomes 0, and it can't benefit from any bonus to its speed.
          </p>
          <p>
            <strong>Attack rolls</strong> against the creature have <strong>advantage</strong>, and the creature's
            attack rolls have <strong>disadvantage</strong>.
          </p>
          <p>
            The creature has <strong>disadvantage</strong> on <strong>Dexterity saving throws</strong>.
          </p>
        </>
      );
    case Condition.STUNNED:
      return (
        <>
          <p>
            A stunned creature is <strong>incapacitated</strong>, can't <strong>move</strong>, and can speak only
            falteringly.
          </p>
          <p>
            The creature automatically fails <strong>Strength</strong> and <strong>Dexterity saving throws</strong>.
          </p>
          <p>
            <strong>Attack rolls</strong> against the creature have <strong>advantage</strong>.
          </p>
        </>
      );
    case Condition.UNCONSCIOUS_OR_SLEEPING:
      return (
        <>
          <p>
            An unconscious creature is <strong>incapacitated</strong>, can't <strong>move</strong> or speak, and is
            unaware of its surroundings
          </p>
          <p>
            The creature drops whatever it's holding and falls <strong>prone</strong>.
          </p>
          <p>
            The creature automatically fails <strong>Strength</strong> and <strong>Dexterity saving throws</strong>.
          </p>
          <p>
            <strong>Attack rolls</strong> against the creature have <strong>advantage</strong>.
          </p>
          <p>
            Any <strong>attack</strong> that hits the creature is a <strong>critical hit</strong> if the attacker is
            within 5 feet of the creature.
          </p>
        </>
      );
    default:
    case Condition.EXHAUSTION:
      return (
        <>
          <p>
            Various rules apply. See{' '}
            <a
              href="https://roll20.net/compendium/dnd5e/Conditions#toc_15"
              target="_blank"
              className="underline hover:no-underline"
              rel="noreferrer"
            >
              roll20.net
            </a>{' '}
            for details.
          </p>
        </>
      );
  }
};
