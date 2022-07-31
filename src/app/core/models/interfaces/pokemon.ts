export interface Pokemon {
  id: number;
  name: string;
  weight?: number;
  height?: number;
  pokemon_v2_pokemonspecy: {
    evolution_chain_id: number;
  };
  pokemon_v2_pokemonstats: {
    base_stat: number;
    pokemon_v2_stat: {
      name: string;
    };
  }[];
  pokemon_v2_pokemonsprites: {
    sprites: string; // There is a bug with pokeapi with this property
  }[];
  pokemon_v2_pokemontypes: {
    pokemon_v2_type: {
      id: number;
      name: string;
    };
  }[];
}

export interface Pokemons extends PokemonAggregation {
  pokemon_v2_pokemon: Pokemon[];
}

export interface PokemonAggregation {
  pokemon_v2_pokemon_aggregate: {
    aggregate: {count: number};
  };
}
