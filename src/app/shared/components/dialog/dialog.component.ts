import {Component, Inject} from '@angular/core';

@Component({
  selector: 'poke-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  constructor(@Inject('data') public data: any) {}

  protected handleAccept(): void {
    this.data.onAccept();
    this.data.closeModal();
  }
}
