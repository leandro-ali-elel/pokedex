import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ExtractPokemonModule} from '../../pipes/extract-pokemon.module';
import {PokeDetailComponent} from './poke-detail.component';

@NgModule({
  declarations: [PokeDetailComponent],
  imports: [CommonModule, ExtractPokemonModule],
  exports: [PokeDetailComponent],
})
export class PokeDetailModule {}
