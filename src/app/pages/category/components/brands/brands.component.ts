import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { environment } from 'src/environments/environment';
import { CategoryService } from '../../service/category.service';
import { BrandMasterPageFilter } from '../interface/BrandMasterPageFilter';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  brandList : any;
  baseUrl: string;
  brandMasterPageFilter : BrandMasterPageFilter;
  rows : number;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  display = false;
  searchData : any;
  searchedbrandList : any;
  BrandName : any;
  PageId : any;

    constructor(private categoryService : CategoryService,private router: Router,private loaderService : LoaderService
      ,private layoutService: LayoutService) {this.baseUrl = environment.apiBaseUrl; this.searchData={}; }
  
    ngOnInit(): void {
      this.initializeLayout();
      this.rows = 5;
      this.searchData = [];
      this.BrandName = [];
   this.getBrands(this.searchData);
    }
    private initializeLayout() {
      this.layoutService.setModel({
      showBottomNavigation: true,
      showTopNavigation: false,
      // isShowFullLengthContainer: false
    });
   }
    getBrands(searchdata)
    {
      this.brandMasterPageFilter={
        BrandId : this.searchData ? this.searchData.BrandId : 0,
        BrandName : this.searchData ? this.searchData.BrandName : '',
        CompanyName : '',
        Skip : 0,
        Take : this.rows
      }
      this.loaderService.setState(true);
      this.categoryService.getBrandList(this.brandMasterPageFilter).subscribe(x=>
        {
          this.loaderService.setState(false);
          this.brandList = x;
          this.display= false;
          this.searchData.BrandName = '';
          this.searchData.BrandId = 0;
        });
    }

    itemList(item)
    {
      this.PageId = 3;
      this.router.navigateByUrl('/ui/category/item/' + item.BrandId + '/' +item.CompanyId + '/' + this.PageId);
    }
    appRoute()
    {
      this.router.navigateByUrl('ui/app-home/1');
    }   
  onScrollDown() {
      console.log('onScrollDown');
    this.brandMasterPageFilter.Skip = this.brandMasterPageFilter.Skip + this.brandMasterPageFilter.Take;
    this.loaderService.setState(true);
    this.categoryService.getBrandList(this.brandMasterPageFilter).subscribe(x => {
      this.loaderService.setState(false);
      if(x && x.length > 0 ){
        this.brandList = this.brandList.concat(x) ;
        this.display = false;
      }
    });
  }
  onSelectbrand(event) {
    this.searchData.BrandName = event.BrandName;
    this.searchData.BrandId = event.BrandId;
  }
  getbrandlistforfilter(event)
  {
    this.loaderService.setState(true);
    this.categoryService.getBrandDetails(event.query).subscribe(res=>
      {
        this.loaderService.setState(false);
        this.searchedbrandList = res && res.length ? res : [];
      })
  }
  
  }
  