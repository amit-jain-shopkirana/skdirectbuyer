import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'process';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShortenUriService {
  apiUrl: string;
  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiBaseUrl +'/api/ShortenUri/';
   }

   getShortUrl(url: string): Observable<string>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "No-Auth": "True"
      })
    };
    
    return this.httpClient.post<string>(this.apiUrl + 'GetShortUrl', {Url: url}, httpOptions);
   }

}
