import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {


  apiURL = environment.apiBaseUrl;

  constructor(private http: HttpClient) {

  }

  UploadImage(formData): any {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      const httpOptions = { headers: headers };
      return this.http.post<any>(this.apiURL + '/Image/PostImage', formData, httpOptions);

  }

}