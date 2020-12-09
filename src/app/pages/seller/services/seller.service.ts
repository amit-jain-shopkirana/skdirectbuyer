import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CartItemDC, DeleteCartItemDC, SellerProductFilter } from '../interface/SellerProductFilter';
import { catchError, tap } from 'rxjs/operators'
import { throwError } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class SellerService {
  
  private apiUrl: string;
  private apiBaseUrl : string;
  cart : number;
  constructor(private http: HttpClient,private route : Router) {
    this.apiUrl = environment.apiUrl;
    this.apiBaseUrl = environment.apiBaseUrl;
  }

  topSeller(Skip,Take): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl + 'Seller/GetTopSeller?Skip=' + Skip + '&Take=' + Take);
  }
  
  encryptSellerId(sellerId: number): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl + 'Seller/EncryptSellerId/' + sellerId );
  }

  placeOrder(PlaceOrderDC): Observable<any> {  
    return this.http.post<any>(this.apiBaseUrl + '/api/Buyer/Order/PlaceOrder', PlaceOrderDC).
    // pipe(catchError(this.handleError) );
    pipe(tap(() => { },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.error.ErrorMessage === '{"Message":"1"}') {
            this.cart = 1;
            this.route.navigate(['/ui/cart/',this.cart]);
          } else {
            return;
          }
        }
      }));
  }
  handleError(error: HttpErrorResponse) {
    alert(error.error.ErrorMessage);
    console.log('error', error);
    if(error.error.ErrorMessage == '{"Message":"1"}')
    {
      this.route.navigateByUrl('ui/cart');
    }
    return throwError(error);
    
  }
 
  getUserLocation(): Observable<any> {  
    return this.http.get<any>(this.apiBaseUrl + '/api/Buyer/Order/GetUserLocation');
  }

  // UpdateCartByBuyer(CookieValue : string): Observable<any> {  
  //   return this.http.post<any>(this.apiBaseUrl + '/api/Buyer/Cart/UpdateCartByBuyer?CookieValue='+ CookieValue, null);
  // }
 
}
