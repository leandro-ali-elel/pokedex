import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Pokemons} from 'src/app/core/models/interfaces/pokemon';
import {PokemonService} from 'src/app/core/services/pokemon.service';

@Component({
  selector: 'poke-my-box',
  templateUrl: './my-box.component.html',
  styleUrls: ['./my-box.component.scss'],
})
export class MyBoxComponent implements OnInit {
  protected box$!: Observable<Pokemons>;
  protected username = localStorage.getItem('username');
  
  constructor(private pokemonService: PokemonService) {}

  public ngOnInit(): void {
    this.box$ = this.pokemonService.getBox(this.username!);
  }
}
