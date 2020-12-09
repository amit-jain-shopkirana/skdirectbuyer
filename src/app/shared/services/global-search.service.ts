import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GlobalSearchService {
  private globalSearchKeywordEvent = new Subject<string>();
  constructor() { }

  getGlobalSearchEvent(): Observable<string> {
    return this.globalSearchKeywordEvent.pipe(
      debounceTime(700),
      distinctUntilChanged());
  }

  setValue(keyword) {
    this.globalSearchKeywordEvent.next(keyword);
  }
}
