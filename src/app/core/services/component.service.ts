import {
  ComponentRef,
  Injectable,
  Injector,
  StaticProvider,
  Type,
  ViewContainerRef,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ComponentService {
  constructor(private injector: Injector) {}

  public createComponent<T>(
    viewContainerRef: ViewContainerRef,
    component: Type<T>,
    data?: any
  ): ComponentRef<T> {
    const provider: StaticProvider = {
      provide: 'data',
      useValue: data,
    };
    const injector = Injector.create({providers: [provider], parent: this.injector});
    viewContainerRef.clear();
    return viewContainerRef.createComponent<T>(component, {injector});
  }
}
