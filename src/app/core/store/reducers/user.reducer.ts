import {createReducer, on} from '@ngrx/store';
import {loginAction, trainerFoundAction} from '../actions/user.actions';

export interface LoginState {
  user: any;
}

export const initialUsernameState: LoginState = {
  user: null,
};

export const loginReducer = createReducer(
  initialUsernameState,
  on(trainerFoundAction, (state, {user}): LoginState => ({...state, user}))
);

export const loginFeatureKey = 'user';
