import {Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {Injectable, Injector, StaticProvider} from '@angular/core';
import {NEVER, race, Subject} from 'rxjs';
import {take, tap} from 'rxjs/operators';
import {ToastComponent} from 'src/app/shared/toast/toast.component';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private overlay: Overlay, private injector: Injector) {}
  /** 
        * Creates an instance of a Component
        @param {TypesOfToast} type - Type of toast
        @param {string} message - Message to show
    */
  public open(type: TypesOfToast, message: string): ToastComponent {
    const overlayRef = this.getOverlayRef();
    const injector = this.getInjector(type, message);
    const modal = new ComponentPortal(ToastComponent, null, injector);
    const instance = overlayRef.attach(modal).instance;
    this.setStreams(overlayRef, instance.afterClosed);
    return instance;
  }

  private setStreams(overlayRef: OverlayRef, afterClosed: Subject<any>): void {
    let keydownStream$: any = overlayRef
      .backdropClick()
      .pipe(tap(() => afterClosed.next()));

    race([keydownStream$, afterClosed])
      .pipe(
        take(1),
        tap(() => {
          overlayRef.dispose();
        })
      )
      .subscribe();
  }

  private getInjector(type: TypesOfToast, message: string): Injector {
    const provider: StaticProvider = {
      provide: 'toastConfig',
      useValue: {type, message},
    };
    return Injector.create({providers: [provider], parent: this.injector});
  }

  private getOverlayRef(): OverlayRef {
    const config = new OverlayConfig({
      hasBackdrop: false,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      positionStrategy: this.overlay.position().global().bottom().right(),
    });

    return this.overlay.create(config);
  }
}

export type TypesOfToast = 'error' | 'info';
