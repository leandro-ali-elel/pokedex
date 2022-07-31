export interface RandomPokemon {
  id: number;
  name: string;
  weight: number;
  height: number;
  calculatedWeight: number;
  calculatedHeight: number;
  isShiny: boolean;
  isMale: boolean;
  pokemon_v2_pokemonsprites: {
    sprites: string; // There is a bug with pokeapi with this property
  }[];
}
