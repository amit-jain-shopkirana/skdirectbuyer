import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { LocalStogareService } from 'src/app/shared/services/local-stogare.service';
import { environment } from 'src/environments/environment';
import { CategoryService } from '../../service/category.service';
import { BrandMasterPageFilter, SellerProductFilter } from '../interface/BrandMasterPageFilter';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  itemList: any[];
  baseUrl: string;
  sellerProductFilter: SellerProductFilter;
  rows: number;
  sellerId: any;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  display = false;
  searchData: any;
  Keyword: any;
  categoryList: any;
  brandList: any;
  CateogryName: any;
  BrandName: any;
  CategoryId: number;
  Id: number;
  CompanyId: number;
  PageId : any;

  constructor(private categoryService: CategoryService, private router: Router, private layoutService: LayoutService
    , private localStorage: LocalStogareService, private loaderService: LoaderService
    , private route: ActivatedRoute) { this.baseUrl = environment.apiBaseUrl; this.searchData = []; }

  ngOnInit(): void {
    this.searchData =[];
    this.BrandName = [];
    this.CateogryName = [];
    this.initializeLayout();
    
    this.route.params.subscribe(params => {
      this.Id = params['Id'];
      this.CompanyId = params['CompanyId'];
      this.PageId = params['PageId'];
      if (this.CompanyId != null) {
        this.searchData.BrandId = this.Id;
      }
      else {
        this.searchData.CateogryId = this.Id;
      }
    });
    this.rows = 7;
    this.getItems();
  }
  getItems() {
    this.sellerId = this.localStorage.getItemString("SellerId");
    this.sellerProductFilter = {
      SellerId: null,
      BrandId: this.searchData ? this.searchData.BrandId : null,
      CateogryId: this.searchData ? this.searchData.CateogryId : null,
      ParentProductId: null,
      Id: null,
      Skip: 0,
      Take: this.rows,
      Latitude: null,
      Longitude: null,
      ProductName: this.searchData ? this.searchData.Keyword : null,
      CateogryName: this.searchData ? this.searchData.CateogryName : null,
      BrandName: this.searchData ? this.searchData.BrandName : null,
      TagId:0,
      Keyword : ''
    }
    this.loaderService.setState(true);
    this.categoryService.getItem(this.sellerProductFilter).subscribe(x => {
      this.loaderService.setState(false);
      this.itemList = x;
      this.display = false;
      console.log('itemList', this.itemList);
    });
  }

  getItemlistforfilter(event) {
    this.sellerProductFilter = {
      SellerId: null,
      BrandId:  null,
      CateogryId:  null,
      ParentProductId: null,
      Id: null,
      Skip: 0,
      Take: this.rows,
      Latitude: null,
      Longitude: null,
      ProductName: null,
      CateogryName: null,
      BrandName: null,
      TagId:0,
      Keyword : event ? event : ''
    }
    this.loaderService.setState(true);
    this.categoryService.getItem(this.sellerProductFilter).subscribe(x => {
      this.loaderService.setState(false);
      console.log('seller product: ', x);
      this.itemList = x;     
    });
  }
  onSelectItem(event) {
    // this.sellerProductFilter = {
    //   SellerId: this.sellerid,
    //   CateogryId: 0,
    //   BrandId: 0,
    //   Latitude: this.lat1,
    //   Longitude: this.lng1,
    //   ProductName : event ? event.ProductName : 0,
    //   Skip : 0,
    //   Take : this.rows
    // }
    // this.loaderService.setState(true);
    // this.sellerProfileService.getSellerProduct(this.sellerProductFilter).subscribe(x => {
    //   this.loaderService.setState(false);
    //   console.log('seller product: ', x);
    //   this.sellerProductList = x.SellerProductDC;
    //   this.addStoreView();
    //   this.updateSellerProductList();
    //   this.userDetail = x.UserDetailDC;
    //   this.lat2 = this.userDetail.Latitiute;
    //   this.lng2 = this.userDetail.Longitude;
    // });

  }
  // filterData()
  // {
  //   this.searchData;
  //   this.loaderService.setState(true);
  //   // this.display = false;
  //   this.loaderService.setState(false);
  // }

  onScrollDown() {
    console.log('onScrollDown');
    this.sellerProductFilter.Skip = this.sellerProductFilter.Skip + this.sellerProductFilter.Take;
    this.loaderService.setState(true);
    this.categoryService.getItem(this.sellerProductFilter).subscribe(x => {
      this.loaderService.setState(false);
      if(x && x.length > 0 ){
        this.itemList = this.itemList.concat(x) ;
        this.display = false;
      }
    });
    
  }

  private initializeLayout() {
    this.layoutService.setModel({
      showBottomNavigation:false,
      showTopNavigation: false,
      isShowFullLengthContainer: true
    })
  }

  appRoute() {
    if(this.PageId == 3)
    {
      this.router.navigateByUrl('ui/category/brand');
    }
    else{
    this.router.navigateByUrl('ui/app-home/1');
    }
  }

  productDetail(items) {
    if(this.PageId == 3)
    {
      this.PageId = 4;
      this.router.navigateByUrl('ui/item/detail/' + items.Id + '/' + items.BrandId + '/' + this.PageId);
    }
    else  if(this.PageId == 4)
    {
      this.router.navigateByUrl('ui/item/detail/' + items.Id + '/' + items.BrandId + '/' + this.PageId);
    }
    else{
    this.PageId = 2;
    this.router.navigateByUrl('ui/item/detail/' + items.Id + '/' + this.PageId);
    }
  }
  onSelectbrand(event) {
    this.searchData.BrandName = event.BrandName;
    this.searchData.BrandId = event.BrandId;
  }
  getbrandlistforfilter(event) {
    this.loaderService.setState(true);
    this.categoryService.getBrandDetails(event.query).subscribe(res => {
      this.loaderService.setState(false);
      this.brandList = res && res.length ? res : [];
    })
  }
  onSelectcategory(event) {
    this.searchData.CateogryName = event.CategoryName;
    this.searchData.CateogryId = event.Id;
  }
  getCategorylistforfilter(event) {
    this.loaderService.setState(true);
    this.categoryService.getCateogryDetails(event.query).subscribe(res => {
      this.loaderService.setState(false);
      this.categoryList = res && res.length ? res : [];
    })
  }
}

