import {PokemonFighter} from '../core/models/interfaces/pokemon-fighter';
import {randomFromInterval} from './numbers';

const attack = (attacker: PokemonFighter) => (skill: any) => (target: PokemonFighter) => {
  const criticMultiplier = 2; // calculate could be 1 or 2
  const firstBonus = 1; // calculate bonus atk dmg type
  const secondBonus = 1; // calculate bonus atk dmg type
  /* attacker level, power of the used move,
 Attack and Special Attack stats of attacking pokemon
 Defense and Special Defense stats of defending pokemon
 STAB (calculated from pokemon type plus attacking type)
 type effectiveness 1 and 2

 */
  return (
    ((((2 * attacker.level * criticMultiplier) / 5 + 2) * skill.power) / (1 / 1) / 50 +
      2) *
    firstBonus *
    secondBonus *
    (randomFromInterval(217, 255) / 255)
  );
};
