import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { LocalStogareService } from 'src/app/shared/services/local-stogare.service';

@Injectable({
  providedIn: 'root'
})
export class CartOverviewService {
  private apiBaseUrl: string;
  constructor(private http: HttpClient, private localStogareService: LocalStogareService) {
    this.apiBaseUrl = environment.apiBaseUrl;
  }

  private getUnAuthHeader(): any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "No-Auth": "True"
      })
    };
  }

  getCartUsingCookie(cookieValue: string): Observable<any> {

    if (this.localStogareService.getItemString(this.localStogareService.tokenKey)) {
      return this.http.get<any>(this.apiBaseUrl + '/api/Buyer/CartOverview/GetCartItems/' + cookieValue);
    } else {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          "No-Auth": "True"
        })
      };
      return this.http.get<any>(this.apiBaseUrl + '/api/Buyer/CartOverview/GetCartItems/' + cookieValue, httpOptions);
    }

  }

  getCartUsingToken(cookieValue: string): Observable<any> {
    return this.http.get<any>(this.apiBaseUrl + '/api/Buyer/CartOverview/GetCartItems/' + cookieValue);
  }

  getCheckOutItem(cookieValue: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "No-Auth": "False"
      })
    };
    return this.http.get<any>(this.apiBaseUrl + '/api/Buyer/Order/GetCheckOutItem?CookieValue=' + cookieValue, httpOptions);
  }

  getDeliveryOption(SellerId: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "No-Auth": "False"
      })
    };
    return this.http.get<any>(this.apiBaseUrl + '/api/Buyer/Order/GetDeliveryOption?SellerId=' + SellerId, httpOptions);
  }
  addCart(CartItemDC): Observable<any> {
    return this.http.post<any>(this.apiBaseUrl + '/api/Buyer/CartOverview/AddCart' , CartItemDC);
  }
  //   
}
