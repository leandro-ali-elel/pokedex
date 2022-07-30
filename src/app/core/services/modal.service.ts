import {Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {Injectable, Injector, StaticProvider} from '@angular/core';
import {merge, NEVER, race, Subject} from 'rxjs';
import {filter, take, tap} from 'rxjs/operators';
import {ModalComponent} from 'src/app/shared/components/modal/modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private overlay: Overlay, private injector: Injector) {}
  /** 
        * Creates an instance of a Component
        @param {unkown} component - Component to render
        @param {any} data - Injectable data
    */
  public open(component: unknown, data?: any): ModalComponent {
    const overlayRef = this.getOverlayRef({
      height: data?.height,
      width: data?.width,
      panelClass: data?.panelClass,
    });
    const injector = this.getInjector(component, {
      ...data,
      overlayRef,
    });
    const modal = new ComponentPortal(ModalComponent, null, injector);
    const instance = overlayRef.attach(modal).instance;
    this.setStreams(overlayRef, instance.afterClosed, data.closeOptions);
    return instance;
  }

  private setStreams(
    overlayRef: OverlayRef,
    afterClosed: Subject<any>,
    closeOptions?: {backdrop: boolean; escape: boolean}
  ): void {
    let keydownStream$: any = NEVER;
    let backdropStream$: any = NEVER;

    if (closeOptions?.backdrop) {
      backdropStream$ = overlayRef.backdropClick().pipe(tap(() => afterClosed.next()));
    }

    if (closeOptions?.escape) {
      keydownStream$ = overlayRef.keydownEvents().pipe(
        filter((keyev: KeyboardEvent) => keyev.key === 'Escape'),
        take(1),
        tap(() => afterClosed.next())
      );
    }

    race([keydownStream$, backdropStream$, afterClosed])
      .pipe(
        take(1),
        tap(() => {
          overlayRef.dispose();
        })
      )
      .subscribe();
  }

  private getInjector(component: any, data: any): Injector {
    const provider: StaticProvider = {
      provide: 'modalConfig',
      useValue: {component, data},
    };
    return Injector.create({providers: [provider], parent: this.injector});
  }

  private getOverlayRef(configParams: {
    height: string;
    width: string;
    panelClass?: string;
  }): OverlayRef {
    const config = new OverlayConfig({
      hasBackdrop: true,
      // backdropClass: 'modal-backdrop',
      panelClass: configParams.panelClass ? configParams.panelClass : 'modal-wrapper',
      height: configParams.height,
      width: configParams.width,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
    });

    return this.overlay.create(config);
  }
}
