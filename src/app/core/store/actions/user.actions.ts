import {createActionGroup, props} from '@ngrx/store';
import {Trainer} from '../../models/interfaces/trainer';

export const authApiActions = createActionGroup({
  source: 'Auth API',
  events: {
    'Login Request': props<{username: string}>(),
    'Login Success': props<{trainer: Trainer}>(),
    'Login Failure': props<{error: string}>(),
  },
});
