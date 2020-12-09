import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent, HttpResponse } from "@angular/common/http";
import { Injectable, PLATFORM_ID, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { tap, mapTo, map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { LocalStogareService } from '../services/local-stogare.service';
import { AuthHelper } from './auth-helper';
import { LayoutService } from '../services/layout.service';
import { LoaderService } from '../services/loader.service';
declare var AES256;
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router
        , @Inject(PLATFORM_ID) private platformId: any
        , private localStorageService: LocalStogareService
        , private loaderService: LoaderService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
        if (req.headers.get('No-Auth') == "True")
            return next.handle(req.clone()).pipe(
                tap(event => {
                }, error => {
                    this.loaderService.setState(false);
                })
                , map(event => {
                    event = AuthHelper.decrypt(event);
                    return event;
                }, error => {
                    this.loaderService.setState(false);
                    console.log('error: ', error);
                    if (error.status == 401) {
                    }
                })
            );

        if (isPlatformBrowser(this.platformId) && localStorage.getItem('userToken') != null) {
            let clonedreq = null;
            clonedreq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            });
            return next.handle(clonedreq).pipe(
                tap(event => {
                }, error => {
                    this.loaderService.setState(false);
                    console.log('error: ', error);
                    if (error.status == 401) {
                        if (!(req.url.indexOf('/login') > -1)) {
                            this.localStorageService.removeItem(this.localStorageService.tokenKey);
                            this.router.navigateByUrl('/login');
                        }
                    }
                })
                , map(event => {
                    event = AuthHelper.decrypt(event);
                    return event;
                }, error => {
                    this.loaderService.setState(false);
                    console.log('error: ', error);
                    if (error.status == 401) {

                    }


                })
            );
        }
        else {
            return next.handle(req).pipe(
                tap(event => {
                }, error => {
                    this.loaderService.setState(false);
                    console.log('error: ', error);
                    if (error.status == 401) {
                        this.localStorageService.removeItem(this.localStorageService.tokenKey);
                        this.router.navigateByUrl('/login');
                    }
                })
                , map(event => {
                    event = AuthHelper.decrypt(event);
                    return event;
                }, error => {
                    this.loaderService.setState(false);
                    console.log('error: ', error);
                    if (error.status == 401) {
                    }
                })
            );
        }
    }



}