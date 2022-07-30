import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {filter, take} from 'rxjs/operators';
import {Trainer} from 'src/app/core/models/interfaces/trainer';
import {authApiActions} from 'src/app/core/store/actions/user.actions';
import {selectLogin} from 'src/app/core/store/reducers/user.reducer';
@Injectable()
export class EntryService {
  constructor(private store: Store<{user: Trainer}>) {}

  public requestLogin(username: string): void {
    this.store.dispatch(authApiActions.loginRequest({username}));
  }

  public login(): Observable<Trainer | undefined> {
    return this.store.select(selectLogin).pipe(
      filter(user => !!user),
      take(1)
    );
  }
}
