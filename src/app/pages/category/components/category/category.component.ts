import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppHomeService } from 'src/app/pages/app-home/services/app-home.service';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { environment } from 'src/environments/environment';
import { CategoryService } from '../../service/category.service';
import { CategoryFilter } from '../interface/BrandMasterPageFilter';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
categoryList : any;
baseUrl: string;
display = false;
searchData : any;
CateogryName : any;
categoryFilter : CategoryFilter;
throttle = 300;
scrollDistance = 1;
scrollUpDistance = 2;

  constructor(private categoryService : CategoryService,private router: Router, private loaderService: LoaderService,
    private appHomeService : AppHomeService,private layoutService: LayoutService) {this.baseUrl = environment.apiBaseUrl; this.searchData={};}

  ngOnInit(): void {
    this.initializeLayout();
    this.CateogryName = [];
    this.searchData = [];
    this.categoryFilter = 
    {
      Skip : 0,
      Take : 10,
      Id: 0,
      ParentCategoryId : 0,
      CategoryName :  '',
      IsParentCategory : true
    }
    this.loaderService.setState(true);
    this.categoryService.getCategorybyfilter(this.categoryFilter).subscribe(x=>
      {
        this.loaderService.setState(false);
        this.categoryList = x;
        this.display = false;
      })
    // this.getCategory(this.searchData);
  }
  private initializeLayout() {
    this.layoutService.setModel({
    showBottomNavigation: true,
    showTopNavigation: false,
    // isShowFullLengthContainer: false
  });
 }
 onScrollDown() {
  console.log('onScrollDown');
  this.categoryFilter.Skip = this.categoryFilter.Skip + this.categoryFilter.Take;
  this.loaderService.setState(true);
  this.categoryService.getCategorybyfilter(this.categoryFilter).subscribe(x => {
    this.loaderService.setState(false);
    if(x && x.length > 0 ){
      this.categoryList = this.categoryList.concat(x) ;
      console.log('this.categoryLis',this.categoryList);
      this.display = false;
    }
  });
}
  subCategory(cat)
  {
    this.router.navigateByUrl('/ui/category/subcategory/' + cat.Id);
  }
  appRoute()
  {
    this.router.navigateByUrl('ui/app-home/1');
  }   
  onSelectcategory(event) {
    this.searchData.CateogryName = event.CategoryName;
    this.searchData.CateogryId = event.Id;
  }
  getCategorylistforfilter(event)
  {
    this.loaderService.setState(true);
    this.categoryService.getCateogryDetails(event.query).subscribe(res=>
      {
        this.loaderService.setState(false);
        this.categoryList = res && res.length ? res : [];
      })
  }
  getCategory(searchData)
  {
    this.categoryFilter = 
    {
      Skip : 0,
      Take : 10,
      Id: 0,
      ParentCategoryId : 0,
      CategoryName : searchData ? searchData.CateogryName : '',
      IsParentCategory : false
    }
    this.loaderService.setState(true);
    this.categoryService.getCategorybyfilter(this.categoryFilter).subscribe(x=>
      {
        this.loaderService.setState(false);
        this.categoryList = x;
        this.display = false;
      })
    
  }

}
