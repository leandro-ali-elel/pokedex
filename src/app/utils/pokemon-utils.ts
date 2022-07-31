import {Pokemon} from '../core/models/interfaces/pokemon';
import {PokemonImages} from '../core/models/interfaces/pokemon-images';
import {RandomPokemon} from '../core/models/interfaces/random-pokemon';
import {pipe} from './fp';
import {randomFromInterval} from './numbers';

export const extractImageFromSprite = (pokemon: Pokemon): PokemonImages =>
  JSON.parse(pokemon.pokemon_v2_pokemonsprites[0].sprites);

export const generateRandomPokemon = (pokemon: Pokemon): RandomPokemon => {
  const calculateRandomValues = pipe(
    calculateRandomHeight,
    calculateRandomWeight,
    calculateSex,
    calculateShiniesity
  );
  const newPokemon = calculateRandomValues(pokemon);
  return newPokemon;
};

export const calculateRandomWeight = (pokemon: Pokemon) => {
  const min = 0.75;
  const max = 1.25;
  const weight = pokemon.weight ?? 0 * randomFromInterval(min, max);
  return {...pokemon, calculatedWeight: weight};
};

export const calculateRandomHeight = (pokemon: Pokemon) => {
  const min = 0.75;
  const max = 1.25;
  const height = pokemon.height ?? 0 * randomFromInterval(min, max);
  return {...pokemon, calculatedHeight: height};
};

export const calculateShiniesity = (pokemon: Pokemon) => {
  const probability = 0.25; // 25%
  const randomNumber = Math.random();
  const isShiny = randomNumber <= probability;
  return {...pokemon, isShiny};
};

export const calculateSex = (pokemon: Pokemon) => {
  const probability = 0.5; // 50%
  const randomNumber = Math.random();
  const isMale = randomNumber <= probability;
  return {...pokemon, isMale};
};
