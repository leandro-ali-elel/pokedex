export interface PokemonEvolutionChain {
  pokemon_v2_evolutionchain: {
    pokemon_v2_pokemonspecies: {
      pokemon_v2_pokemons: {
        id: number;
        name: string;
        height: number;
        weight: number;
        pokemon_v2_pokemonsprites: {
          sprites: string;
        }[];
      }[];
    }[];
  }[];
}
