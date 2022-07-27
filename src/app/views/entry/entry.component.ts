import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {EntryService} from './entry.service';

@Component({
  selector: 'poke-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
})
export class EntryComponent implements OnInit {
  protected form = new UntypedFormGroup({
    username: new UntypedFormControl('', [Validators.required, Validators.minLength(3)]),
  });

  constructor(private fb: UntypedFormBuilder, private entryService: EntryService) {}

  public ngOnInit(): void {
    this.initializeForm();
  }

  public handleLoginRequest(): void {
    if (this.form.invalid) {
      alert('oops, there is something wrong with the form, search for red messages to find where!');
    }

    this.entryService.login(this.form.value.usernamwde).subscribe();
  }

  private initializeForm(): void {
    this.form = 
  }
}
