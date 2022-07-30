import {ActionReducer, INIT, MetaReducer} from '@ngrx/store';
import {authApiActions} from '../actions/user.actions';

export function logout(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    if (action != null && action.type === authApiActions.logout.type) {
      return reducer(undefined, {type: INIT});
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer[] = [logout];
