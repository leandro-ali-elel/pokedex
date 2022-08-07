import {Action, ActionReducer, INIT, MetaReducer} from '@ngrx/store';
import {authApiActions} from '../actions/user.actions';

export const rehydratation =
  (reducer: ActionReducer<any>): ActionReducer<any> =>
  (state: any, action: Action) => {
    if (action != null && action.type === INIT) {
      const storedState = localStorage.getItem('state');
      if (storedState) {
        try {
          return JSON.parse(storedState);
        } catch {
          localStorage.removeItem('state');
        }
      }
    }
    
    localStorage.setItem('state', JSON.stringify(state));

    return reducer(state, action);
  };

export function logout(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    if (action != null && action.type === authApiActions.logout.type) {
      return reducer(undefined, {type: INIT});
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer[] = [logout, rehydratation];
