import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  pluck,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';
import {Pokemon} from 'src/app/core/models/interfaces/pokemon';
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
  protected pokemons$!: Observable<Pokemon[]>;
  protected sortBy$ = new BehaviorSubject<PokedexSortBy>('id');
  protected sortByOrder$ = new BehaviorSubject<PokedexSortByOrder>('asc');
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

  private setUpStreams(): void {
    this.listenPokedexEvents();
  }

  private listenPokedexEvents(): void {
    const searchName$ = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      startWith('')
    );

    this.pokemons$ = combineLatest([this.sortBy$, this.sortByOrder$, searchName$]).pipe(
      debounceTime(300),
      tap(() => (this.isLoading = true)),
      switchMap(([sortBy, sortByOrder, searchName]) =>
        this.pokedexFacade.getAllPokemons(sortBy, sortByOrder, searchName)
      ),
      pluck('pokemon_v2_pokemon'),
      tap(() => (this.isLoading = false))
    );
  }
}
