import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import { Joke } from 'src/app/core/models/interfaces/joke';
import {DadJokesService} from 'src/app/core/services/dad-jokes.service';

@Component({
  selector: 'poke-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  protected joke$!: Observable<Joke>;

  constructor(private dadJokesService: DadJokesService) {}

  public ngOnInit(): void {
    this.joke$ = this.dadJokesService.getJoke()
  }

}
