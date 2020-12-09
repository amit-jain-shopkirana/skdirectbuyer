import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BuyerProfileService {
  apiUrl: string;
  constructor(private http: HttpClient) { 
    this.apiUrl = environment.apiUrl;
  }

  isBuyerLogin(): Observable<boolean> {
    return this.http.get<boolean>(this.apiUrl + 'Profile/IsBuyerLogin');
  }
}
