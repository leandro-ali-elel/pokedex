import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EMPTY, of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {PokemonService} from '../../services/pokemon.service';
import {loginAction, trainerFoundAction} from '../actions/user.actions';

@Injectable()
export class UserEffects {
  findTrainer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginAction.type),
      mergeMap((username: string) =>
        this.pokemonService.findTrainer(username).pipe(
          map(trainer => trainerFoundAction({user: trainer})),
          catchError(() => of({type: '[Poke API] Trainer Not Found'}))
        )
      )
    );
  });

  constructor(private actions$: Actions, private pokemonService: PokemonService) {}
}
