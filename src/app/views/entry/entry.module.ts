import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {EntryRoutingModule} from './entry-routing.module';
import {EntryComponent} from './entry.component';
import {EntryService} from './entry.service';

@NgModule({
  declarations: [EntryComponent],
  imports: [CommonModule, ReactiveFormsModule, EntryRoutingModule],
  providers: [EntryService],
})
export class EntryModule {}
