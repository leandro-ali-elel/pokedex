import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map, pluck} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {Trainer} from '../models/trainer';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private httpClient: HttpClient) {}

  public getTeam(username: string): Observable<number[]> {
    return this.findTrainer(username).pipe(pluck('team'));
  }

  public getBox(username: string): Observable<number[]> {
    return this.findTrainer(username).pipe(pluck('box'));
  }

  public findTrainer(username: string): Observable<Trainer> {
    return this.httpClient.get<Trainer[]>(`${environment.trainersAPIURL}`).pipe(
      map(trainers => {
        const selectedTrainer = trainers.find(trainer => trainer.name === username);
        if (!selectedTrainer) {
          throw new HttpErrorResponse({statusText: `cannot find username in database`});
        }
        return selectedTrainer;
      })
    );
  }
}
