import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {BehaviorSubject, combineLatest, EMPTY, Observable, of} from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  sample,
  startWith,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import {normalize} from 'src/app/core/graphql/queries/strings';
import {Pokemons} from 'src/app/core/models/interfaces/pokemon';
import {PokeCardConfig} from 'src/app/shared/components/poke-card/poke-card.component';
import {PokedexFacade} from './pokedex.facade';

export type PokedexSortBy = 'id' | 'name';
export type PokedexSortByOrder = 'asc' | 'desc';

@Component({
  selector: 'poke-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})
export class PokedexComponent implements OnInit {
  protected cardsConfig: PokeCardConfig = {mode: 'horizontal'};
  protected searchControl = new FormControl('');
  protected pokemons$!: Observable<Pokemons>;
  protected sortBy$ = new BehaviorSubject<PokedexSortBy>('id');
  protected sortByOrder$ = new BehaviorSubject<PokedexSortByOrder>('asc');
  protected triggerTable$ = new BehaviorSubject<null>(null);
  protected offset$ = new BehaviorSubject<number>(0);
  protected limit$ = new BehaviorSubject<number>(10);

  protected isLoading = true;
  constructor(private pokedexFacade: PokedexFacade) {}

  public ngOnInit(): void {
    this.setUpStreams();
  }

  protected handleChangeTableSortOrder(
    column: PokedexSortBy,
    sortBy: PokedexSortBy,
    sortByOrder: PokedexSortByOrder
  ) {
    if (column === sortBy) {
      const nextOrder = sortByOrder === 'asc' ? 'desc' : 'asc';
      this.sortByOrder$.next(nextOrder);
      return;
    }
    this.sortBy$.next(column);
    this.sortByOrder$.next('asc');
  }

  protected handleChangePage(step: number): void {
    const currentOffset = this.offset$.getValue();
    const limit = this.limit$.getValue();
    const nextOffset = currentOffset + step * limit;
    this.offset$.next(nextOffset);
    this.triggerTable$.next(null);
  }

  protected playPokemonCry(pokemonId: number): void {
    this.pokedexFacade.playPokemonCry(pokemonId);
  }

  private setUpStreams(): void {
    this.listenPokedexEvents();
  }

  private listenPokedexEvents(): void {
    const searchName$ = this.searchControl.valueChanges.pipe(
      debounceTime(600),
      map(normalize),
      distinctUntilChanged(),
      startWith('')
    );

    const volatileFilters$ = combineLatest([
      this.limit$,
      this.sortBy$,
      this.sortByOrder$,
      searchName$,
    ]).pipe(tap(() => this.offset$.next(0)));

    /* 
    The problem with this approach lies on the difficulty of managing side effects.
    When a volatile filter changes, offset should reset to 0, which is a pretty difficult
    task to do without firing dangerous side effects inside the chain.
    I think this approach could be a little sloopy sometimes...
    but gets the job done without firing side effects.
    Maybe offset shouldn't be a Subject? Only God knows. 
    */
    this.pokemons$ = combineLatest([volatileFilters$, this.triggerTable$]).pipe(
      withLatestFrom(this.offset$),
      tap(_ => (this.isLoading = true)),
      switchMap(([[[limit, sortBy, sortByOrder, searchName], _], offset]) =>
        this.pokedexFacade.getAllPokemons(offset, limit, sortBy, sortByOrder, searchName)
      ),
      tap(() => {
        window.scroll(0, 0);
        this.isLoading = false;
      })
    );
  }
}
