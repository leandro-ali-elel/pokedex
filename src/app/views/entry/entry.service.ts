import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Trainer} from 'src/app/core/models/trainer';
import {PokemonService} from 'src/app/core/services/pokemon.service';
import {environment} from 'src/environments/environment';
@Injectable()
export class EntryService {
  constructor(private pokemonService: PokemonService) {}

  public login(username: string): Observable<Trainer> {
    return this.pokemonService
      .findTrainer(username)
      .pipe(tap(trainer => localStorage.setItem('username', trainer.name)));
  }
}
