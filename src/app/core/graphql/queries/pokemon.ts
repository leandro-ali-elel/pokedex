import {gql} from 'apollo-angular';

export const GET_ALL_POKEMONS = gql`
  query Pokedex(
    $order_by: [pokemon_v2_pokemon_order_by!]
    $search: String!
    $offset: Int!,
    $limit: Int!
  ) {
    pokemon_v2_pokemon(
      order_by: $order_by
      offset: $offset,
      limit: $limit,
      where: {
        name: {_regex: $search}
        _and: {pokemon_v2_pokemonspecy: {generation_id: {_lt: 5}}}
      }
    ) {
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
    }
  }
`;
