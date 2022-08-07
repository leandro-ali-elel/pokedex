import {Component, OnInit} from '@angular/core';
import {combineLatest, forkJoin, merge, Observable, Subject} from 'rxjs';
import {concatMap, filter, first, mergeMap, scan, switchMap, tap} from 'rxjs/operators';
import {Pokemon} from 'src/app/core/models/interfaces/pokemon';
import {PokemonFighter} from 'src/app/core/models/interfaces/pokemon-fighter';
import {FightFacade} from './fight.facade';

@Component({
  selector: 'poke-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.scss'],
})
export class FightComponent implements OnInit {
  protected stateMachine$!: Observable<any>;
  private playerPokemon$!: Observable<Pokemon>;
  private enemyPokemon$!: Observable<Pokemon>;
  private attack$ = new Subject();
  constructor(private fightFacade: FightFacade) {}

  ngOnInit(): void {
    this.playerPokemon$ = this.fightFacade.getMyPokemonFighterStats().pipe(first());
    this.enemyPokemon$ = this.fightFacade.getEnemyPokemonFighterStats().pipe(first());
    this.stateMachine$ = forkJoin([this.playerPokemon$, this.enemyPokemon$]).pipe();
  }

  protected attack(): void {
    // this.stateMachine$.next({turn: 'enemy'});
    this.attack$.next();
  }

  protected startBattle(): void {
    // this.stateMachine$.next({turn: 'player'});
  }
}
