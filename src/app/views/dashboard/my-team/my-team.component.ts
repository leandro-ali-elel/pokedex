import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Pokemons} from 'src/app/core/models/interfaces/pokemon';
import {PokemonService} from 'src/app/core/services/pokemon.service';

@Component({
  selector: 'poke-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.scss'],
})
export class MyTeamComponent implements OnInit {
  protected team$!: Observable<Pokemons>;
  protected username = localStorage.getItem('username');
  constructor(private pokemonService: PokemonService) {}

  public ngOnInit(): void {
    this.team$ = this.pokemonService.getTeam(this.username!);
  }
}
