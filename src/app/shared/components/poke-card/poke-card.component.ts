import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Pokemon} from 'src/app/core/models/interfaces/pokemon';
import {PokemonImages} from 'src/app/core/models/interfaces/pokemon-images';

@Component({
  selector: 'poke-poke-card',
  templateUrl: './poke-card.component.html',
  styleUrls: ['./poke-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokeCardComponent implements OnChanges {
  @Input() public pokemon!: Pokemon;
  protected pokemonImg?: PokemonImages;

  public ngOnChanges(simpleChanges: SimpleChanges): void {
    const pokemon: Pokemon | undefined = simpleChanges.pokemon?.currentValue;
    if (pokemon && pokemon.pokemon_v2_pokemonsprites.length > 0) {
      this.pokemonImg = JSON.parse(pokemon.pokemon_v2_pokemonsprites[0].sprites);
    }
  }
}
