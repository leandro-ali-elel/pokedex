import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Pokemons} from 'src/app/core/models/interfaces/pokemon';
import {PokemonService} from 'src/app/core/services/pokemon.service';
import {PokedexSortBy, PokedexSortByOrder} from './pokedex.component';

@Injectable()
export class PokedexFacade {
  constructor(private pokemonService: PokemonService) {}

  public getAllPokemons(
    resultsPerPage: number,
    sortBy: PokedexSortBy,
    sortByOrder: PokedexSortByOrder,
    offset: number
  ): Observable<Pokemons> {
    return this.pokemonService.getAllPokemons(
      resultsPerPage,
      {[sortBy]: sortByOrder},
      offset
    );
  }
}
