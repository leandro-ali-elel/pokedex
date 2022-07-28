import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {PokemonService} from 'src/app/core/services/pokemon.service';

@Component({
  selector: 'poke-choose-team',
  templateUrl: './choose-team.component.html',
  styleUrls: ['./choose-team.component.scss'],
})
export class ChooseTeamComponent implements OnInit {
  protected team$!: Observable<number[]>;

  constructor(private pokemonService: PokemonService) {}

  public ngOnInit(): void {
    const username = localStorage.getItem('username');
    this.team$ = this.pokemonService.getTeam(username!);
  }
}
