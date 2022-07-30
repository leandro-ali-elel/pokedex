import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from 'src/environments/environment';
import {UserEffects} from './core/store/effects/user.effects';
import {metaReducers} from './core/store/reducers/meta.reducers';

@NgModule({
  imports: [
    StoreModule.forRoot({}, {metaReducers}),
    StoreDevtoolsModule.instrument({maxAge: 20, logOnly: environment.production}),
    EffectsModule.forRoot([UserEffects]),
  ],
  exports: [StoreModule, StoreDevtoolsModule, EffectsModule],
})
export class NGRXModule {}
