import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import { ExtractPokemonModule } from '../../pipes/extract-pokemon.module';
import {PokeCardComponent} from './poke-card.component';

@NgModule({
  declarations: [PokeCardComponent],
  imports: [CommonModule, ExtractPokemonModule],
  exports: [PokeCardComponent],
})
export class PokeCardModule {}
