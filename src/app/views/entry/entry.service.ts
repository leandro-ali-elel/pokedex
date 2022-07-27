import {Injectable} from '@angular/core';
import {EMPTY, Observable, of} from 'rxjs';

@Injectable()
export class EntryService {
  constructor() {}

  public login(username: string): Observable<never> {
    localStorage.setItem('username', username);
    return EMPTY;
  }
}
