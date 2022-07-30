import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Observable, timer} from 'rxjs';
import {pluck, switchMap, tap} from 'rxjs/operators';
import {GET_JOKES} from '../graphql/queries/jokes';
import {Joke} from '../models/interfaces/joke';

@Injectable({
  providedIn: 'root',
})
export class DadJokesService {
  constructor(private apollo: Apollo) {}

  public getJoke(): Observable<Joke> {
    const time = 4000; //20s
    return timer(0, time).pipe(
      switchMap(_ =>
        this.apollo.use('jokes').query({query: GET_JOKES}).pipe(pluck('data'))
      )
    ) as Observable<Joke>;
  }
}
