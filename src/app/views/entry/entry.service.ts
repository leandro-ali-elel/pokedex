import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Trainer} from 'src/app/core/models/interfaces/trainer';
import {PokemonService} from 'src/app/core/services/pokemon.service';
@Injectable()
export class EntryService {
  constructor(private pokemonService: PokemonService) {}

  public login(username: string): Observable<Trainer> {
    return this.pokemonService
      .findTrainer(username)
      .pipe(tap(trainer => localStorage.setItem('username', trainer.name)));
  }
}
