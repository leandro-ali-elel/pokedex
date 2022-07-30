import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Pokemons} from 'src/app/core/models/interfaces/pokemon';
import {PokemonEvolutionChain} from 'src/app/core/models/interfaces/pokemon-evolution-chain';
import {PokemonService} from 'src/app/core/services/pokemon.service';

@Component({
  selector: 'poke-poke-detail',
  templateUrl: './poke-detail.component.html',
  styleUrls: ['./poke-detail.component.scss'],
})
export class PokeDetailComponent implements OnInit {
  protected pokemon$!: Observable<PokemonEvolutionChain>;

  constructor(
    @Inject('data') private data: any,
    private pokemonService: PokemonService
  ) {}

  public ngOnInit(): void {
    this.pokemon$ = this.pokemonService.getPokemonEvolutionChain(this.data.evolutionId);
  }

  protected playPokemonCry(pokemonId: number): void {
    this.pokemonService.getPokemonCry(pokemonId).play();
  }
}
