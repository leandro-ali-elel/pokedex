import {createReducer, on} from '@ngrx/store';
import {rehydratationActions} from '../actions/hydratation.actions';

export const rehydratationReducer = createReducer(
  on(rehydratationActions.rehydratationSuccess, (state, newState: any): any => newState)
);
