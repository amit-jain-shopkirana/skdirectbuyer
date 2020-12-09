import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserLocationDc } from '../interface/user-location-dc';

@Injectable({
  providedIn: 'root'
})
export class BuyerAddressService {
  private apiUrl: string;
  constructor(private http: HttpClient) { 
    this.apiUrl = environment.apiUrl;
  }

  addLocation(locationList: UserLocationDc[]): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + 'BuyerLocation/AddLocation' , locationList);
  }

  updateLocation(locationList: UserLocationDc[]): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + 'BuyerLocation/UpdateLocation' , locationList);
  }
}
