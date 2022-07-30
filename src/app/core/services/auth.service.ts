import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {authApiActions} from '../store/actions/user.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private store: Store) {}
  public logout(): void {
    this.store.dispatch(authApiActions.logout());
    localStorage.removeItem('username');
  }

  public saveSession(username: string): void {
    localStorage.setItem('username', username);
  }
}
