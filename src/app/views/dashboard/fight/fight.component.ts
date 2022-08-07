import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import { tap } from 'rxjs/operators';
import { Pokemon } from 'src/app/core/models/interfaces/pokemon';
import {PokemonFighter} from 'src/app/core/models/interfaces/pokemon-fighter';
import {FightFacade} from './fight.facade';

@Component({
  selector: 'poke-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.scss'],
})
export class FightComponent implements OnInit {
  myPokemon$!: Observable<Pokemon>;
  enemyPokemon$!: Observable<Pokemon>;

  constructor(private fightFacade: FightFacade) {}

  ngOnInit(): void {
    this.myPokemon$ = this.fightFacade.getMyPokemonFighterStats().pipe(tap(console.log));
    this.enemyPokemon$ = this.fightFacade.getEnemyPokemonFighterStats().pipe(tap(console.log));
  }
}
