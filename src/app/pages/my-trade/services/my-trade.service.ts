import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderDetailDC } from '../interface/order-detail-dc';
import { OrderMasterDC } from '../interface/order-master-dc';
import { OrderMasterFilter } from '../interface/order-master-filter';

@Injectable({
  providedIn: 'root'
})
export class MyTradeService {
  private apiUrl: string;
  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getOrderMaster(orderMasterFilter: OrderMasterFilter): Observable<OrderMasterDC[]>{
    return this.http.post<OrderMasterDC[]>(this.apiUrl + 'MyTrade/GetOrderMaster' , orderMasterFilter);
  }

  getOrderDetails(orderId: number): Observable<OrderDetailDC[]>{
    return this.http.get<OrderDetailDC[]>(this.apiUrl + 'MyTrade/GetOrderDetails/' + orderId );
  }
}
