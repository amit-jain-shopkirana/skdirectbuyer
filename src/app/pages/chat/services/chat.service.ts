import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SellerListDC } from '../interfaces/seller-list-dc';
import { SellerListFilterDC } from '../interfaces/seller-list-filter-dc';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  baseApiUrl: string;
  
  constructor(private http: HttpClient) { 
    this.baseApiUrl = environment.apiBaseUrl;
  }

  getMyContact(): Observable<any>{
    return this.http.get<any>(this.baseApiUrl +'/api/Common/GetMyMobileNumber');
  }

  getSellerList(filter: SellerListFilterDC): Observable<SellerListDC[]>{
    return this.http.post<SellerListDC[]>(this.baseApiUrl + '/api/Chat/GetSellerList', filter);
  } 

}
