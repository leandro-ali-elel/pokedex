import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {PokemonService} from '../../services/pokemon.service';
import {ToastService} from '../../services/toast.service';
import {authApiActions} from '../actions/user.actions';

@Injectable()
export class UserEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authApiActions.loginRequest.type),
      mergeMap((payload: Action & {username: string}) =>
        this.pokemonService.findTrainer(payload.username).pipe(
          map(trainer => {
            // there I would call an authService or smt like that
            localStorage.setItem('username', trainer.name);
            return authApiActions.loginSuccess({trainer});
          }),
          catchError(error => {
            this.toastService.open('error', error);
            return of(authApiActions.loginFailure({error: 'Some nice error message'}));
          })
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private pokemonService: PokemonService,
    private toastService: ToastService
  ) {}
}
