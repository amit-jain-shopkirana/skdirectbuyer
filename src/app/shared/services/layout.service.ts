import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { LayoutModel } from '../interface/layout-model';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private layoutModelSubject =  new  BehaviorSubject<LayoutModel>({
    showBottomNavigation: true,
    showTopNavigation: true,
    isShowFullLengthContainer: false
  });
  constructor() { }

  getModel()  : BehaviorSubject<LayoutModel>{
    return this.layoutModelSubject;
  }

  setModel(layoutModel: LayoutModel){
    if(!layoutModel.isShowFullLengthContainer){
      layoutModel.isShowFullLengthContainer = false;
    }
    setTimeout(() => {
      this.layoutModelSubject.next(layoutModel);
    }, 50);
    
  }
}
