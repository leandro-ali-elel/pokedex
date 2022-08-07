import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {RandomPokemon} from 'src/app/core/models/interfaces/random-pokemon';
import {DialogService} from 'src/app/core/services/dialog.service';
import {PokemonService} from 'src/app/core/services/pokemon.service';

@Component({
  selector: 'poke-random-pokemon',
  templateUrl: './random-pokemon.component.html',
  styleUrls: ['./random-pokemon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RandomPokemonComponent implements OnInit {
  protected loading = false;
  protected pokemon$!: Observable<RandomPokemon>;
  private pokemonTrigger$ = new BehaviorSubject<null>(null);

  constructor(
    private dialogService: DialogService,
    private pokemonService: PokemonService
  ) {}

  public ngOnInit(): void {
    this.showDialog();
    this.getPokemon();
  }

  public handleGenerateAgain(): void {
    this.pokemonTrigger$.next(null);
  }

  private showDialog(): void {
    const hasReadDialog = localStorage.getItem('dialog-random-pokemon-accepted');
    if (!hasReadDialog) {
      this.dialogService.open(
        'Random Pokemon generator',
        'Here I will generate a random pokemon based on real pokemon stats such as height, weight and the possibility to be shiny. You can generate more pokemons just by pressing the Generate Again button.',
        () => localStorage.setItem('dialog-random-pokemon-accepted', 'true')
      );
    }
  }

  private getPokemon(): void {
    this.pokemon$ = this.pokemonTrigger$.pipe(
      tap(() => (this.loading = true)),
      switchMap(() => this.pokemonService.generateRandomPokemon()),
      tap(() => (this.loading = false))
    );
  }
}
