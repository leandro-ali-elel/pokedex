import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Pokemon} from 'src/app/core/models/interfaces/pokemon';

@Component({
  selector: 'poke-poke-card',
  templateUrl: './poke-card.component.html',
  styleUrls: ['./poke-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokeCardComponent {
  @Input() public pokemon!: Pokemon;
}
