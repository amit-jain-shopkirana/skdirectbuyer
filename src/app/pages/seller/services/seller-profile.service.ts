import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SellerProductFilter, CartItemDC, DeleteCartItemDC } from '../interface/SellerProductFilter';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStogareService } from 'src/app/shared/services/local-stogare.service';

@Injectable({
  providedIn: 'root'
})
export class SellerProfileService {
  private apiBaseUrl: string;
  token: any;
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

  getSellerProduct(data: SellerProductFilter): Observable<any> {
    if (this.localStogareService.getItemString(this.localStogareService.tokenKey)) {
      return this.http.post<any>(this.apiBaseUrl + '/api/Buyer/SellerProfile/GetSellerProduct', data);
    } else {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          "No-Auth": "True"
        })
      };
      return this.http.post<any>(this.apiBaseUrl + '/api/Buyer/SellerProfile/GetSellerProduct', data, httpOptions);
    }
  }
  getCartItem(CookieValue: string): Observable<any> {
    if (this.localStogareService.getItemString(this.localStogareService.tokenKey)) {
      return this.http.get<any>(this.apiBaseUrl + '/api/Buyer/SellerProfile/GetCartItems?CookieValue=' + CookieValue);
    } else {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          "No-Auth": "True"
        })
      };
      return this.http.get<any>(this.apiBaseUrl + '/api/Buyer/SellerProfile/GetCartItems?CookieValue=' + CookieValue, httpOptions);
    }
  }

  getUserLocation(): Observable<any> {
    const httpOptions = this.getUnAuthHeader();
    return this.http.get<any>(this.apiBaseUrl + '/api/Buyer/SellerProfile/GetUserSavedLocation', httpOptions);
  }
  getUsersLocation(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "No-Auth": "False"
      })
    };
    return this.http.get<any>(this.apiBaseUrl + '/api/Buyer/SellerProfile/GetUserSavedLocation', httpOptions);
  }
  addCart(data: CartItemDC): Observable<any> {
    if (this.localStogareService.getItemString(this.localStogareService.tokenKey)) {
      return this.http.post<any>(this.apiBaseUrl + '/api/Buyer/SellerProfile/AddCart', data);
    } else {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          "No-Auth": "True"
        })
      };
      return this.http.post<any>(this.apiBaseUrl + '/api/Buyer/SellerProfile/AddCart', data, httpOptions);
    }
  }


  clearCart(Id: string): Observable<any> {
    const httpOptions = this.getUnAuthHeader();
    return this.http.post<any>(this.apiBaseUrl + '/api/Buyer/SellerProfile/ClearCart?Id=' + Id, httpOptions);
  }

  deleteCartItem(deleteCartItemDC: DeleteCartItemDC): Observable<any> {
    if (this.localStogareService.getItemString(this.localStogareService.tokenKey)) {
      return this.http.post<any>(this.apiBaseUrl + '/api/Buyer/SellerProfile/DeleteCartItems', deleteCartItemDC);
    } else {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          "No-Auth": "True"
        })
      };
      return this.http.post<any>(this.apiBaseUrl + '/api/Buyer/SellerProfile/DeleteCartItems', deleteCartItemDC, httpOptions);
    }
  }
 
  addStoreView(StoreViewDC): Observable<any> {
    return this.http.post<any>(this.apiBaseUrl + '/api/Buyer/SellerProfile/AddStoreView', StoreViewDC);
  }
  addProductView(ProductViewDC): Observable<any> {
    return this.http.post<any>(this.apiBaseUrl + '/api/Buyer/SellerProfile/AddProductView', ProductViewDC);
  }
}
