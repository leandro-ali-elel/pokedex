import {gql} from 'apollo-angular';

export const GET_ALL_POKEMONS = gql`
  query Pokedex(
    $order_by: [pokemon_v2_pokemon_order_by!]
    $search: String!
    $searchId: Int!
    $offset: Int!
    $limit: Int!
  ) {
    pokemon_v2_pokemon_aggregate(
      where: {_or: [{name: {_regex: $search}}, {id: {_eq: $searchId}}]}
    ) {
      aggregate {
        count
      }
    }
    pokemon_v2_pokemon(
      order_by: $order_by
      offset: $offset
      limit: $limit
      where: {_or: [{name: {_regex: $search}}, {id: {_eq: $searchId}}]}
    ) {
      id
      name
      pokemon_v2_pokemonspecy {
        evolution_chain_id
      }
      pokemon_v2_pokemonstats(where: {stat_id: {_in: [1, 2, 3, 6]}}) {
        pokemon_v2_stat {
          name
        }
        base_stat
      }
      pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`;

export const GET_ALL_POKEMONS_FROM_IDS = gql`
  query Pokemons($ids: [Int!]) {
    pokemon_v2_pokemon(where: {id: {_in: $ids}}) {
      id
      name
      pokemon_v2_pokemonstats(where: {stat_id: {_in: [1, 2, 3, 6]}}) {
        pokemon_v2_stat {
          name
        }
        base_stat
      }
      pokemon_v2_pokemonsprites {
        sprites
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          id
          name
          pokemon_v2_typeefficacies {
            damage_factor
            id
          }
        }
      }
    }
  }
`;
