import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStogareService } from 'src/app/shared/services/local-stogare.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiBaseUrl: string;
  constructor(private http: HttpClient, private localStogareService: LocalStogareService) {
    this.apiBaseUrl = environment.apiBaseUrl;
  }
  getCateogry(): Observable<any> {
    if (this.localStogareService.getItemString(this.localStogareService.tokenKey)) {
      return this.http.get<any>(this.apiBaseUrl + '/api/Buyer/cateogry/GetCateogry');
    } else {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          "No-Auth": "True"
        })
      };
      return this.http.get<any>(this.apiBaseUrl + '/api/Buyer/cateogry/GetCateogry' , httpOptions);
    }

  }
  getSubCateogry(CategoryId): Observable<any> {
    if (this.localStogareService.getItemString(this.localStogareService.tokenKey)) {
      return this.http.get<any>(this.apiBaseUrl + '/api/Buyer/SubCateogry/GetSubcateogry/' + CategoryId);
    } else {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          "No-Auth": "True"
        })
      };
      return this.http.get<any>(this.apiBaseUrl + '/api/Buyer/SubCateogry/GetSubcateogry/' + CategoryId , httpOptions);
    }

  }
  getBrandList(BrandMasterPageFilter): Observable<any> {
    if (this.localStogareService.getItemString(this.localStogareService.tokenKey)) {
      return this.http.post<any>(this.apiBaseUrl + '/api/Buyer/Brand/GetBrandList',BrandMasterPageFilter);
    } else {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          "No-Auth": "True"
        })
      };
      return this.http.post<any>(this.apiBaseUrl + '/api/Buyer/Brand/GetBrandList',BrandMasterPageFilter , httpOptions);
    }
  }
  getItem(SellerProductFilter): Observable<any> {
    if (this.localStogareService.getItemString(this.localStogareService.tokenKey)) {
      return this.http.post<any>(this.apiBaseUrl + '/api/Buyer/Item/GetItem',SellerProductFilter);
    } else {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          "No-Auth": "True"
        })
      };
      return this.http.post<any>(this.apiBaseUrl + '/api/Buyer/Item/GetItem',SellerProductFilter , httpOptions);
    }
  }
  getBrandDetails(Name): Observable<any> {
      return this.http.get<any>(this.apiBaseUrl + '/api/Buyer/Item/GetBrandDetails?Name='+Name);
   }

   getCateogryDetails(Name): Observable<any> {
    return this.http.get<any>(this.apiBaseUrl + '/api/Buyer/Item/GetCateogryDetails?Name='+Name);
    }
    getCategorybyfilter(CategoryFilter): Observable<any> {
   return this.http.post<any>(this.apiBaseUrl + '/api/Buyer/cateogry/GetCategorybyfilter',CategoryFilter);
  }
  getTagMasterDetail(TagMasterFilter): Observable<any> {
    return this.http.post<any>(this.apiBaseUrl + '/api/Buyer/Item/GetTagMasterDetail',TagMasterFilter);
   }
}

