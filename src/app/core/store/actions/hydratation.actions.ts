import {createActionGroup, props} from '@ngrx/store';

export const rehydratationActions = createActionGroup({
  source: 'Rehydratation',
  events: {
    'Rehydratation Request': props<any>(),
    'Rehydratation Success': props<{state: any}>(),
    'Rehydratation Failure': props<{error: string}>(),
  },
});
