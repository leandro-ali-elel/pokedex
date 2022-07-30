import {OverlayRef} from '@angular/cdk/overlay';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {ReplaySubject, Subject} from 'rxjs';
import {ComponentService} from 'src/app/core/services/component.service';

@Component({
  selector: 'poke-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements AfterViewInit {
  @ViewChild('host', {read: ViewContainerRef}) protected host!: ViewContainerRef;
  public component$ = new ReplaySubject<any>(1);
  public afterClosed = new Subject<any>();

  constructor(
    @Inject('modalConfig') public config: ModalConfig,
    private componentService: ComponentService,
    private cdr: ChangeDetectorRef
  ) {}

  public ngAfterViewInit(): void {
    this.component$.next(
      this.componentService.createComponent(this.host, this.config.component, {
        ...this.config.data,
        closeModal: () => this.closeModal(),
      }).instance
    );
    this.cdr.detectChanges();
  }

  public closeModal(): void {
    this.afterClosed.next();
  }
}

export interface ModalConfig {
  component: any;
  data: {
    overlayRef: OverlayRef;
    data: any;
    hideCloseButton?: boolean;
    timesColor?: string;
    id: number;
  };
}
