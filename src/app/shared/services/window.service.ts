import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  constructor(@Inject(PLATFORM_ID) private platformId: any) { }


  alertMessage(message:any){
    if (isPlatformBrowser(this.platformId)) {
      alert(message);
    }
  }
  windowHref(hrefString: string){
    if (isPlatformBrowser(this.platformId)) {
      window.location.href = hrefString;
    }
  }
}
