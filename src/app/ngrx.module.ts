import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from 'src/environments/environment';
import {RehydratationEffects} from './core/store/effects/rehydratation.effects';
import {UserEffects} from './core/store/effects/user.effects';
import {rehydratationReducer} from './core/store/reducers/hydratation.reducers';
import {metaReducers} from './core/store/reducers/meta.reducers';

@NgModule({
  imports: [
    StoreModule.forRoot(rehydratationReducer, {metaReducers}),
    StoreDevtoolsModule.instrument({maxAge: 20, logOnly: environment.production}),
    EffectsModule.forRoot([UserEffects, RehydratationEffects]),
  ],
  exports: [StoreModule, StoreDevtoolsModule, EffectsModule],
})
export class NGRXModule {}
