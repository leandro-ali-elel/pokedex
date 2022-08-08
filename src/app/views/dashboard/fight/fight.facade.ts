import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {EMPTY, Observable} from 'rxjs';
import {filter, map, switchMap, tap} from 'rxjs/operators';
import {Pokemon} from 'src/app/core/models/interfaces/pokemon';
import {PokemonFighter} from 'src/app/core/models/interfaces/pokemon-fighter';
import {PokemonService} from 'src/app/core/services/pokemon.service';
import {selectLogin} from 'src/app/core/store/reducers/user.reducer';
import {randomFromInterval} from 'src/app/utils/numbers';

@Injectable({providedIn: 'root'})
export class FightFacade {
  constructor(private pokemonService: PokemonService, private store: Store) {}

  public getEnemyPokemonFighterStats(): Observable<Pokemon> {
    const randomPokemonId = randomFromInterval(1, 150);
    return this.pokemonService.getFighterPokemon(randomPokemonId);
  }

  public getMyPokemonFighterStats = (): Observable<Pokemon> => {
    return this.store.select(selectLogin).pipe(
      filter(res => !!res),
      switchMap(res => this.pokemonService.getFighterPokemon(res!.team[0]))
    );
  };
}
