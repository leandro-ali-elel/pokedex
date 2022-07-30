import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {EntryService} from './entry.service';

@Component({
  selector: 'poke-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
})
export class EntryComponent implements OnInit {
  protected form = new FormGroup({
    username: new FormControl('', Validators.required),
  });

  constructor(private entryService: EntryService, private router: Router) {}

  public ngOnInit(): void {
    this.handleLoginSuccess();
  }

  public handleLoginRequest(): void {
    this.entryService.requestLogin(this.form.value['username']!);
  }

  private handleLoginSuccess() {
    this.entryService.login().subscribe({
      complete: () => {
        this.router.navigate(['dashboard']);
      },
    });
  }
}
