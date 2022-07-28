import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Trainer} from 'src/app/core/models/trainer';
import { environment } from 'src/environments/environment';
@Injectable()
export class EntryService {
  constructor(private httpClient: HttpClient) {}

  public login(username: string): Observable<Trainer> {
    return this.httpClient.get<Trainer[]>(`${environment.trainersAPIURL}`).pipe(
      map(trainers => {
        const selectedTrainer = trainers.find(trainer => trainer.name === username);
        if (!selectedTrainer) {
          throw new HttpErrorResponse({error: 403, statusText: `cannot find username in database`});
        }
        return selectedTrainer;
      })
    );
  }
}
