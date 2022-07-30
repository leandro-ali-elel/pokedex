import {gql} from 'apollo-angular';

export const GET_POKEMON_EVOLUTION_CHAIN = gql`
  query Evolution($evolutionId: Int!) {
    pokemon_v2_evolutionchain(where: {id: {_eq: $evolutionId}}) {
      pokemon_v2_pokemonspecies {
        pokemon_v2_pokemons {
          id
          name
          height
          weight
          pokemon_v2_pokemonsprites {
            sprites
          }
        }
      }
    }
  }
`;
