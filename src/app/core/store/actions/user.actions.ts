import {createAction, props} from '@ngrx/store';

export const loginAction = createAction(
  '[Entry] Login Request',
  props<{username: string}>()
);

export const trainerFoundAction = createAction(
  '[Poke API] Trainer Found',
  props<{user: any}>()
);
