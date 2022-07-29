import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Pokemons} from 'src/app/core/models/interfaces/pokemon';
import {PokemonService} from 'src/app/core/services/pokemon.service';
import {PokedexSortBy, PokedexSortByOrder} from './pokedex.component';

@Injectable()
export class PokedexFacade {
  constructor(private pokemonService: PokemonService) {}

  public getAllPokemons(
    offset: number,
    limit: number,
    sortBy: PokedexSortBy,
    sortByOrder: PokedexSortByOrder,
    searchName: string | null
  ): Observable<Pokemons> {
    return this.pokemonService.getAllPokemons(
      {[sortBy]: sortByOrder},
      searchName ?? '',
      offset,
      limit
    );
  }

  public playPokemonCry(pokemonId: number): void {
    this.pokemonService.getPokemonCry(pokemonId).play();
  }
}
