import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { SkAlertLayout } from '../interface/sk-alert-layout';

@Injectable({
  providedIn: 'root'
})
export class SkAlertService {
  private onClose: Subject<void> = new Subject<void>();
  private skAlertLayout: BehaviorSubject<SkAlertLayout> = new BehaviorSubject<SkAlertLayout>({
    bodyMessage: null,
    headerMessage: null,
    isShowAlert: false,
    buttonMessage: null
  });
  constructor() { }

  open(layout: SkAlertLayout) : Observable<void>{
    layout.isShowAlert = true;
    this.skAlertLayout.next(layout);
    return this.onClose.pipe(take(1));
  }

  close() {
    this.skAlertLayout.next({
      bodyMessage: null,
      headerMessage: null,
      isShowAlert: false,
      buttonMessage: null,
    });
  }

  initialize() {
    this.skAlertLayout.next({
      bodyMessage: null,
      headerMessage: null,
      isShowAlert: false,
      buttonMessage: null
    });
  }
  get(): BehaviorSubject<SkAlertLayout> {
    return this.skAlertLayout;
  }

  callWhenClose(){
    this.onClose.next();
  }
}
