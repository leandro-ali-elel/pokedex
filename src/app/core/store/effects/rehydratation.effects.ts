import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType, OnInitEffects} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {of} from 'rxjs';
import {catchError, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {rehydratationActions} from '../actions/hydratation.actions';
import {authApiActions} from '../actions/user.actions';

@Injectable()
export class RehydratationEffects implements OnInitEffects {
  rehydratation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(rehydratationActions.rehydratationRequest.type),
      map(() => {
        const localState = localStorage.getItem('state');
        const state = JSON.parse(localState ?? '');

        if (!state || Object.keys(state).length === 0) {
          throw rehydratationActions.rehydratationFailure({
            error: 'State not found on localStorage',
          });
        }

        return rehydratationActions.rehydratationSuccess({state});
      }),
      catchError(error => {
        localStorage.removeItem('state');
        return of(authApiActions.loginFailure({error}));
      })
    );
  });

  serialize$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          rehydratationActions.rehydratationSuccess,
          rehydratationActions.rehydratationFailure
        ),
        switchMap(() => this.store),
        distinctUntilChanged(),
        tap(state => localStorage.setItem('state', JSON.stringify(state)))
      );
    },
    {dispatch: false}
  );

  public ngrxOnInitEffects(): Action {
    return rehydratationActions.rehydratationRequest({});
  }

  constructor(private actions$: Actions, private store: Store) {}
}
