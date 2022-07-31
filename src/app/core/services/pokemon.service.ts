import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Observable, of} from 'rxjs';
import {map, pluck, shareReplay, switchMap, tap} from 'rxjs/operators';
import {generateRandomPokemon} from 'src/app/utils/pokemon-utils';
import {environment} from 'src/environments/environment';
import {
  GET_ALL_POKEMONS,
  GET_ALL_POKEMONS_COUNT,
  GET_ALL_POKEMONS_FROM_IDS,
  GET_RANDOM_POKEMON,
} from '../graphql/queries/pokemon';
import {GET_POKEMON_EVOLUTION_CHAIN} from '../graphql/queries/pokemon-evolution-chain';
import {Pokemon, PokemonAggregation, Pokemons} from '../models/interfaces/pokemon';
import {PokemonEvolutionChain} from '../models/interfaces/pokemon-evolution-chain';
import {RandomPokemon} from '../models/interfaces/random-pokemon';
import {Trainer} from '../models/interfaces/trainer';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private allPokemons$?: Observable<Pokemons>;

  constructor(private httpClient: HttpClient, private apollo: Apollo) {}

  public generateRandomPokemon(): Observable<RandomPokemon> {
    // return this.apollo
    // .use('pokemon')
    // .query<PokemonAggregation>({query: GET_ALL_POKEMONS_COUNT})
    // .pipe(
    // map(res => res.data.pokemon_v2_pokemon_aggregate.aggregate.count),
    const count = 500; // PokeAPI has a bug with generations
    const randomPokemonId = Math.floor(Math.random() * count);
    return this.apollo
      .use('pokemon')
      .query({query: GET_RANDOM_POKEMON, variables: {id: randomPokemonId}})
      .pipe(
        map(res =>
          generateRandomPokemon((res.data as any).pokemon_v2_pokemon[0] as Pokemon)
        )
      ) as Observable<RandomPokemon>;
  }

  public getAllPokemons(
    order_by: Object,
    search: string,
    offset: number,
    limit: number
  ): Observable<Pokemons> {
    if (!this.allPokemons$) {
      const searchId = Number.isNaN(+search) ? 0 : +search;
      return this.apollo
        .use('pokemon')
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
        .pipe(pluck('data')) as Observable<Pokemons>;
    }
    return this.allPokemons$;
  }

  public findTrainer(username: string): Observable<Trainer> {
    return this.httpClient.get<Trainer[]>(`${environment.trainersAPIURL}`).pipe(
      map(trainers => {
        const selectedTrainer = trainers.find(trainer => trainer.name === username);
        if (!selectedTrainer) {
          const randomUser = trainers[Math.floor(Math.random() * trainers.length)];
          throw new Error(`oops, we cannot find that user, try with ${randomUser.name}`);
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
      .use('pokemon')
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
      .use('pokemon')
      .query({query: GET_ALL_POKEMONS_FROM_IDS, variables: {ids}})
      .pipe(pluck('data')) as Observable<Pokemons>;
  }
}
