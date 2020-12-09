import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStogareService } from 'src/app/shared/services/local-stogare.service';
import { environment } from 'src/environments/environment';
import { UserLocationDc } from '../interface/user-location-dc';
import { UserProfileDetailDC } from '../interface/user-profile-detail-dc';


@Injectable({
  providedIn: 'root'
})
export class BuyerProfileService {
  private apiurl: string;
  constructor(private http: HttpClient, private localStogareService : LocalStogareService) {
    this.apiurl = environment.apiUrl;
  }

  // getUserDetail(): Observable<UserProfileDetailDC> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       "No-Auth": "True"
  //     })
  //   };
  //   return this.http.get<UserProfileDetailDC>(this.apiurl + 'Profile/GetUserDetail',httpOptions);
  // }
  getUserDetail(): Observable<UserProfileDetailDC> {
    if (this.localStogareService.getItemString(this.localStogareService.tokenKey)) {
      return this.http.get<UserProfileDetailDC>(this.apiurl + 'Profile/GetUserDetail');
    } else {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          "No-Auth": "True"
        })
      };
      return this.http.get<UserProfileDetailDC>(this.apiurl + 'Profile/GetUserDetail',httpOptions);    }
  }

  getStateCity(pincode: string): Observable<any> {
    return this.http.get<any>(this.apiurl + 'Profile/GetStateCity/' + pincode);
  }

  getUserSavedLocation(): Observable<UserLocationDc[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "No-Auth": "False"
      })
    };
    return this.http.get<UserLocationDc[]>(this.apiurl + 'Profile/GetUserLocation',httpOptions);
  }

  updateUserLocation(locationList: UserLocationDc[]): Observable<boolean> {
    return this.http.post<boolean>(this.apiurl + 'Profile/UpdateUserLocation', locationList);
  }

  addLocation(locationList: UserLocationDc[]): Observable<boolean> {
    return this.http.post<boolean>(this.apiurl + 'Profile/AddLocation', locationList);
  }
  addUserDetail(detailList: UserProfileDetailDC): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "No-Auth": "False"
      })
    };
    return this.http.post<boolean>(this.apiurl + 'Profile/AddUserDetail', detailList, httpOptions);
  }
  updateUserDetail(detailList: UserProfileDetailDC): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "No-Auth": "False"
      })
    };
    return this.http.post<boolean>(this.apiurl + 'Profile/UpdateUserDetail', detailList, httpOptions);
  }
  makeDefaultAddress(Id): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "No-Auth": "False"
      })
    };
    return this.http.get<boolean>(this.apiurl + 'Profile/MakeDefaultAddress/'+ Id, httpOptions);
  }

  getLocation(lat, lng): Observable<any>{
    return this.http.get<any>(this.apiurl + 'Profile/GetLocation?lat='+ lat + '&lng=' + lng);
  }

  changePassword(ChangePasswordDC): Observable<any>{
    return this.http.post<any>(this.apiurl + 'Profile/ChangePassword' , ChangePasswordDC);
  }
}
