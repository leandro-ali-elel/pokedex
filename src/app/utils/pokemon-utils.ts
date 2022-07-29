import {Pokemon} from '../core/models/interfaces/pokemon';
import {PokemonImages} from '../core/models/interfaces/pokemon-images';

export const extractImageFromSprite = (pokemon: Pokemon): PokemonImages =>
  JSON.parse(pokemon.pokemon_v2_pokemonsprites[0].sprites);
