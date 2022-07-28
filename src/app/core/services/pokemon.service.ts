import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Observable} from 'rxjs';
import {map, pluck, switchMap, takeUntil, takeWhile, tap} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {Trainer} from '../models/trainer';

export const POKEMON = gql`
  query Pokemon($id: Int!) {
    pokemon_v2_pokemon(where: {id: {_eq: $id}}) {
      id
      name
    }
  }
`;

export const GET_TRAINER_BY_USERNAME = gql`
  query Trainer($name: String!) {
    pokemon_v2_pokemon {
      name
      team
      box
    }
  }
`;
@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private httpClient: HttpClient, private apollo: Apollo) {}

  public getTeam(username: string): Observable<unknown> {
    return this.findTrainer(username).pipe(
      pluck('team'),
      switchMap(
        (team: number[]) =>
          this.apollo.watchQuery({
            query: POKEMON,
            variables: {
              id: 10,
            },
          }).valueChanges
      ),
      pluck('data', 'pokemon_v2_pokemon')
    );
  }

  public getBox(username: string): Observable<number[]> {
    return this.findTrainer(username).pipe(pluck('box'));
  }

  public findTrainer(username: string): Observable<any> {
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
