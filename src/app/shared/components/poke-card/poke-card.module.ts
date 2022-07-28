import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {PokeCardComponent} from './poke-card.component';

@NgModule({
  declarations: [PokeCardComponent],
  imports: [CommonModule],
  exports: [PokeCardComponent],
})
export class PokeCardModule {}
