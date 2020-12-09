import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SellerProductDetailService {
  apiurl: string;
  constructor(private http: HttpClient) {
    this.apiurl = environment.apiUrl + 'SellerProductDetail/';
  }

  getSellerProductById(sellerProductId: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "No-Auth": "True"
      })
    };
    return this.http.get(this.apiurl + 'GetSellerProductById/' + sellerProductId, httpOptions);
  }

  getCartItemUsingCookie(CookieValue: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "No-Auth": "False"
      })
    };
    return this.http.get<any>(this.apiurl + 'GetCartItems/' + CookieValue, httpOptions);
  }
  getCartItemUsingToken(CookieValue: string): Observable<any> {
    return this.http.get<any>(this.apiurl + 'GetCartItems/' + CookieValue);
  }

  addCartItem(item): Observable<any[]> {
    return this.http.post<any[]>(this.apiurl + 'AddCartItem/' , item);
  }

  getProductDetailsForCart(item): Observable<any> {
    return this.http.post<any>(this.apiurl + 'GetProductDetailsForCart/' , item);
  }
}
