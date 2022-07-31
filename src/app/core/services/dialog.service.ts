import {Injectable} from '@angular/core';
import {DialogComponent} from 'src/app/shared/components/dialog/dialog.component';
import {ModalComponent} from 'src/app/shared/components/modal/modal.component';
import {ModalService} from './modal.service';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private modalService: ModalService) {}

  public open(header: string, body: string, onAccept: Function): ModalComponent {
    return this.modalService.open(DialogComponent, {header, body, onAccept});
  }
}
