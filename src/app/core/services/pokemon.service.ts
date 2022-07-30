import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Observable} from 'rxjs';
import {map, pluck, shareReplay, switchMap} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {GET_ALL_POKEMONS} from '../graphql/queries/pokemon';
import {GET_POKEMON_EVOLUTION_CHAIN} from '../graphql/queries/pokemon-evolution-chain';
import {Pokemons} from '../models/interfaces/pokemon';
import {PokemonEvolutionChain} from '../models/interfaces/pokemon-evolution-chain';
import {Trainer} from '../models/interfaces/trainer';

export const POKEMONS = gql`
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

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private allPokemons$?: Observable<Pokemons>;

  constructor(private httpClient: HttpClient, private apollo: Apollo) {}

  public getAllPokemons(
    order_by: Object,
    search: string,
    offset: number,
    limit: number
  ): Observable<Pokemons> {
    if (!this.allPokemons$) {
      const searchId = Number.isNaN(+search) ? 0 : +search;
      return this.apollo
        .query({
          query: GET_ALL_POKEMONS,
          variables: {
            order_by,
            search,
            offset,
            limit,
            searchId,
          },
        })
        .pipe(shareReplay(1), pluck('data')) as Observable<Pokemons>;
    }
    return this.allPokemons$;
  }

  public findTrainer(username: string): Observable<Trainer> {
    return this.httpClient.get<Trainer[]>(`${environment.trainersAPIURL}`).pipe(
      map(trainers => {
        const selectedTrainer = trainers.find(trainer => trainer.name === username);
        if (!selectedTrainer) {
          throw new HttpErrorResponse({statusText: `cannot find username in database`});
        }
        return selectedTrainer;
      })
    );
  }

  public getBox(username: string): Observable<Pokemons> {
    return this.findTrainer(username).pipe(
      pluck('box'),
      switchMap(team => this.getPokemonsFromCollectionId(team))
    );
  }

  public getPokemonEvolutionChain(
    evolutionId: number
  ): Observable<PokemonEvolutionChain> {
    return this.apollo
      .query({query: GET_POKEMON_EVOLUTION_CHAIN, variables: {evolutionId}})
      .pipe(pluck('data')) as Observable<PokemonEvolutionChain>;
  }

  public getPokemonCry(pokemonId: number): HTMLAudioElement {
    const audio = new Audio();
    audio.src = `${environment.criesSoundbankURL}${pokemonId}.mp3`;
    audio.load();
    return audio;
  }

  public getTeam(username: string): Observable<Pokemons> {
    return this.findTrainer(username).pipe(
      pluck('team'),
      switchMap(team => this.getPokemonsFromCollectionId(team))
    );
  }

  private getPokemonsFromCollectionId(ids: number[]): Observable<Pokemons> {
    return this.apollo
      .query({query: POKEMONS, variables: {ids}})
      .pipe(pluck('data')) as Observable<Pokemons>;
  }
}
