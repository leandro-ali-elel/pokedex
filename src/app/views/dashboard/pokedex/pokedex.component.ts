import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {Pokemons} from 'src/app/core/models/interfaces/pokemon';
import {PokedexFacade} from './pokedex.facade';

export type PokedexSortBy = 'id' | 'name';
export type PokedexSortByOrder = 'asc' | 'desc';

@Component({
  selector: 'poke-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})
export class PokedexComponent implements OnInit {
  protected pokemons$!: Observable<Pokemons>;
  protected resultsPerPage$ = new BehaviorSubject<number>(15);
  protected sortBy$ = new BehaviorSubject<PokedexSortBy>('id');
  protected sortByOrder$ = new BehaviorSubject<PokedexSortByOrder>('asc');

  constructor(private pokedexFacade: PokedexFacade) {}

  public ngOnInit(): void {
    this.setUpStreams();
  }

  private setUpStreams(): void {
    this.listenPokedexEvents();
  }

  private listenPokedexEvents(): void {
    this.pokemons$ = combineLatest([
      this.resultsPerPage$,
      this.sortBy$,
      this.sortByOrder$,
    ]).pipe(
      switchMap(([resultsPerPage, sortBy, sortByOrder]) =>
        this.pokedexFacade.getAllPokemons(resultsPerPage, sortBy, sortByOrder)
      )
    );
  }
}
