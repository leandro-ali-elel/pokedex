import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {loginFeatureKey, loginReducer} from 'src/app/core/store/reducers/user.reducer';
import {EntryRoutingModule} from './entry-routing.module';
import {EntryComponent} from './entry.component';
import {EntryService} from './entry.service';

@NgModule({
  declarations: [EntryComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EntryRoutingModule,
    StoreModule.forFeature(loginFeatureKey, loginReducer),
  ],
  providers: [EntryService],
})
export class EntryModule {}
