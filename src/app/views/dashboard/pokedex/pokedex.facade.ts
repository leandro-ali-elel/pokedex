import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Pokemon, PokemonAggregation, Pokemons} from 'src/app/core/models/interfaces/pokemon';
import {ModalService} from 'src/app/core/services/modal.service';
import {PokemonService} from 'src/app/core/services/pokemon.service';
import {TutorialService} from 'src/app/core/services/tutorial.service';
import {PokeDetailComponent} from 'src/app/shared/components/poke-detail/poke-detail.component';
import {PokedexSortBy, PokedexSortByOrder} from './pokedex.component';

@Injectable()
export class PokedexFacade {
  constructor(
    private pokemonService: PokemonService,
    private tutorialService: TutorialService,
    private modalService: ModalService
  ) {}

  public getAllPokemons(
    offset: number,
    limit: number,
    sortBy: PokedexSortBy,
    sortByOrder: PokedexSortByOrder,
    searchName: string | null
  ): Observable<Pokemons & PokemonAggregation> {
    return this.pokemonService.getAllPokemons(
      {[sortBy]: sortByOrder},
      searchName ?? '',
      offset,
      limit
    );
  }

  public showInitialMessage(): void {}

  public showPokemonDetails(pokemon: Pokemon): void {
    this.modalService.open(PokeDetailComponent, {
      evolutionId: pokemon.pokemon_v2_pokemonspecy?.evolution_chain_id,
      closeOptions: {
        backdrop: true,
        escape: true,
      },
    });
  }
}
