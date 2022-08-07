export interface PokemonFighter {
  health: number;
  level: number;
  getDamaged: (damage: number) => {};
}
