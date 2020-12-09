import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loader =  new  BehaviorSubject<boolean>(false);
  constructor() { }

  getState()  : BehaviorSubject<boolean>{
    return this.loader;
  }

  setState(flag: boolean){
    setTimeout(() => {
      this.loader.next(flag);  
    }, 50);
    
  }
}
