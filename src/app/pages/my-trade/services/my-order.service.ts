import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyOrderService {
  private apiUrl: string;
  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getOrderMaster(orderMasterFilter): Observable<any>{
    return this.http.post<any>(this.apiUrl + 'MyOrder/GetOrderMaster' , orderMasterFilter);
  }

  getOrderDetails(OrderId): Observable<any>{
    return this.http.get<any>(this.apiUrl + 'MyOrder/GetOrderDetails/'+ OrderId);
  }

  rating(orderRatingDC): Observable<any>{
    return this.http.post<any>(this.apiUrl + 'OrderReview/Rating' , orderRatingDC);
  }

  GetOrderDetailProcess(OrderId): Observable<any>{
    return this.http.get<any>(this.apiUrl + 'MyOrder/GetOrderDetailProcess?OrderId='+ OrderId);
  }

  cancelOrder(OrderId): Observable<any>{
    return this.http.post<any>(this.apiUrl + 'MyOrder/CancelOrder?OrderId='+ OrderId , null);
  }


}
