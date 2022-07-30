import {createReducer, createSelector, on} from '@ngrx/store';
import {Trainer} from '../../models/interfaces/trainer';
import {authApiActions} from '../actions/user.actions';

export interface UserState {
  trainer?: Trainer;
}

export const initialUsernameState: UserState = {};

export const loginReducer = createReducer(
  initialUsernameState,
  on(authApiActions.loginSuccess, (state, {trainer}): UserState => ({...state, trainer}))
);

export const loginFeatureKey = 'trainer';
export const selectFeature = (state: any) => state.trainer;

export const selectLogin = createSelector(
  selectFeature,
  (state: UserState) => state.trainer
);
