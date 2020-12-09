import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders,HttpErrorResponse, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OtpMasterDC, UserDetailDc } from '../interface/OtpMasterDC';
import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SilentLoginService {

  private apiurl: string;
  constructor(private httpClient: HttpClient) {
    this.apiurl = environment.apiBaseUrl;
  }

  // userAuthentication(userName, password): Observable<any> {
  //   const formData = new FormData();
  //   var data = '';
  //   formData.append('grant_type', 'grant_type');
  //   formData.append('username', userName);
  //   formData.append('password', password);
  //   formData.append('ISOTP', 'False');
  //   formData.append('ISBUYER', 'True');
    
  //   data = "grant_type=password&username=" + userName + "&password=abc&ISOTP=False&ISBUYER=True";

  //   var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
  //   return this.httpClient.post<any>(this.apiurl + '/token', data, { headers: reqHeader });
  //   //return this.http.post(this.rootUrl + '/token', formData);
  // }
  userAuthentication(userName, password, ISOTP,ISBUYER, loginType): Observable<any> {
    const formData = new FormData();
    var data = '';
    formData.append('grant_type', 'grant_type');
    formData.append('username', userName);
    formData.append('password', password);
    formData.append('ISOTP', ISOTP);
    formData.append('ISBUYER', ISBUYER);
    
    data = "grant_type=password&username=" + userName + "&password=" + password + "&ISOTP=" + ISOTP + "&ISBUYER=" + ISBUYER+ "&LOGINTYPE=" + loginType;

    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
    return this.httpClient.post<any>(this.apiurl + '/token', data, { headers: reqHeader }).pipe(
      catchError(this.handleError)
      ); ;
    //return this.http.post(this.rootUrl + '/token', formData);
  }
  handleError(error: HttpErrorResponse){
    alert(error.error.error + ' ' + error.error.error_description);
    // console.log('error',error.error.ErrorMessage);
    return throwError(error);
    }
  
  checkUserExist(UserName): Observable<any> {  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "No-Auth": "True"
      })
    };
    return this.httpClient.get<any>(this.apiurl + '/api/Buyer/Registration/CheckUserExist?UserName='+UserName,httpOptions);
  }
  postOtp(data: OtpMasterDC): Observable<any> {  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "No-Auth": "True"
      })
    };
    return this.httpClient.post<any>(this.apiurl + '/api/Buyer/Registration/PostOtp',data,httpOptions);
  }

  
  generateOtp(mobile: string): Observable<any> {  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "No-Auth": "True"
      })
    };
    return this.httpClient.get<any>(this.apiurl + '/api/Buyer/Registration/GenerateOtp/' + mobile,httpOptions);
  }


  verfiyOtp(data: any): Observable<any> {  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "No-Auth": "True"
      })
    };
    
    return this.httpClient.post<any>(this.apiurl + '/api/Buyer/Registration/VerfiyOtp',data,httpOptions);
  }
  addUserDetail(user: UserDetailDc): Observable<any> {  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "No-Auth": "True"
      })
    };
    
    return this.httpClient.post<any>(this.apiurl + '/api/Buyer/Registration/AddUserDetail',user,httpOptions);
  }
  addUserLocation(user): Observable<any> {  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "No-Auth": "True"
      })
    };
    
    return this.httpClient.post<any>(this.apiurl + '/api/Buyer/Registration/AddUserLocation',user,httpOptions);
  }
  AddUserLocation(user): Observable<any> {  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "No-Auth": "False"
      })
    };
    
    return this.httpClient.post<any>(this.apiurl + '/api/Buyer/Order/AddUserLocation',user,httpOptions);
  }
  getByPinAsync(pin : string): Observable<string>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "No-Auth": "True"
      })
    };
    
    return this.httpClient.get<string>(this.apiurl + '/api/Common/GetByPinAsync/'+ pin, httpOptions);
  }
}


