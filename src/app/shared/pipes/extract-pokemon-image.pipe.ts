import {Pipe, PipeTransform} from '@angular/core';
import {PokemonImages} from 'src/app/core/models/interfaces/pokemon-images';

@Pipe({
  name: 'extractPokemonImage',
})
export class ExtractPokemonImagePipe implements PipeTransform {
  transform(value: string, isShiny = false, isMale = true): string {
    const obj = JSON.parse(value) as PokemonImages;
    let img: string;
    if (isShiny) {
      if (!isMale) {
        img = obj.front_shiny_female;
      }
      img = obj.front_shiny;
    } else if (isMale) {
      img = obj.front_default;
    } else {
      img = obj.front_female;
    }

    return img ?? obj.front_default;
  }
}
