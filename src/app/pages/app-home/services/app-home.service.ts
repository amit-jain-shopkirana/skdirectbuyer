import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AppHomeDc } from '../interfaces/app-home-dc';
import { TopSellerDc } from '../interfaces/top-seller-dc';

@Injectable({
  providedIn: 'root'
})
export class AppHomeService {
  private apiUrl: string;
  apiURL : string;
  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
    this.apiURL = environment.apiBaseUrl; 
  }

  getAppHome(appHomeId: number): Observable<AppHomeDc>{
    return this.http.get<AppHomeDc>(this.apiUrl + 'SkAppHome/GetAppHome/' + appHomeId);
  }

  getTopSellerAsync(appHomeId: number): Observable<TopSellerDc[]>{
    return this.http.get<TopSellerDc[]>(this.apiUrl + 'SkAppHome/GetTopSeller/' + appHomeId);
  }
  getBuyerAppHome(): Observable<TopSellerDc[]>{
    return this.http.get<TopSellerDc[]>(this.apiUrl + 'SkAppHome/GetBuyerAppHome');
  }
  globalSearch(GlobalSearchFilter): Observable<any>{
    return this.http.post<any>(this.apiURL + '/api/AppHome/GlobalSearch',GlobalSearchFilter);
  }
  encryptSellerId(SellerId): Observable<any>{
    return this.http.get<any>(this.apiURL + '/api/AppHome/EncryptSellerId?SellerId='+ SellerId);
  }
}
