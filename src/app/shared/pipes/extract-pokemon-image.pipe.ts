import {Pipe, PipeTransform} from '@angular/core';
import {PokemonImages} from 'src/app/core/models/interfaces/pokemon-images';

@Pipe({
  name: 'extractPokemonImage',
})
export class ExtractPokemonImagePipe implements PipeTransform {
  transform(value: string): string {
    const obj = JSON.parse(value) as PokemonImages;
    const imageUrl = obj.front_default;
    return imageUrl ?? '';
  }
}
