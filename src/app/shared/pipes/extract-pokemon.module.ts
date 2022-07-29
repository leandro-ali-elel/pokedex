import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ExtractPokemonImagePipe} from './extract-pokemon-image.pipe';

@NgModule({
  declarations: [ExtractPokemonImagePipe],
  imports: [CommonModule],
  exports: [ExtractPokemonImagePipe],
})
export class ExtractPokemonModule {}
