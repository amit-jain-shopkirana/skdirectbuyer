import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ConfirmModel } from './confirm-model';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {
  
  public confirModelObserver: BehaviorSubject<ConfirmModel> = new BehaviorSubject<ConfirmModel>(null);
  public confirmObserver: Subject<void> = new Subject<void>();
  constructor() { }

  reset() {
    let model = this.getDefaultConfirmModel();
    this.confirModelObserver.next(model);
  }

  confirm(model?: ConfirmModel): Observable<void> {
    let defaultModel = this.getDefaultConfirmModel();
    if (model) {
      defaultModel.show = true;
      defaultModel.bodyMessage = (model.bodyMessage == undefined) ? defaultModel.bodyMessage : model.bodyMessage;
      defaultModel.headerMessage = (model.headerMessage == undefined) ? defaultModel.headerMessage : model.headerMessage;
      defaultModel.yesButton = (model.yesButton == undefined) ? defaultModel.yesButton : model.yesButton;
      defaultModel.noButton = (model.noButton == undefined) ? defaultModel.noButton : model.noButton;
    }
    this.confirModelObserver.next(defaultModel);

    return this.confirmObserver.pipe(take(1));
  }

  accept() {
    this.confirmObserver.next();
  }
  cancel() {
    this.confirmObserver.error(null);
    this.confirmObserver = new Subject<void>();
  }

  private getDefaultConfirmModel(): ConfirmModel {
    let model: ConfirmModel = {
      bodyMessage: 'Are you sure, tou want to perform this operation?',
      headerMessage: 'Confirmation',
      noButton: 'No',
      yesButton: 'Yes',
      show: false
    }
    return model;
  }
}
