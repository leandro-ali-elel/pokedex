import {Component, Inject, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {TypesOfToast} from 'src/app/core/services/toast.service';

@Component({
  selector: 'poke-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  public afterClosed = new Subject<any>();

  constructor(
    @Inject('toastConfig') public toastConfig: {type: TypesOfToast; message: string}
  ) {}

  ngOnInit(): void {
    const fakeTimer = 6000;
    this.initAutoDestruction(fakeTimer);
  }

  public closeToast(): void {
    this.afterClosed.next();
  }

  private initAutoDestruction(time: number): void {
    setTimeout(() => this.closeToast(), time);
  }
}
