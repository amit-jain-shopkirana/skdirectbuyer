import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { environment } from 'src/environments/environment';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit {
  subCategoryList : any;
  baseUrl: string;
  CategoryId: number;
  noRecord : boolean = false;
    constructor(private categoryService : CategoryService,private router: Router,private loaderService : LoaderService,
      private route: ActivatedRoute) {this.baseUrl = environment.apiBaseUrl; }
  
    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.CategoryId = params['Id'];
      });
    this.getCategories(this.CategoryId)
    }
    getCategories(CategoryId)
    {
      this.loaderService.setState(true);
      this.categoryService.getSubCateogry(CategoryId).subscribe(x=>
        {
          this.loaderService.setState(false);
          this.subCategoryList = x;
          if(this.subCategoryList.length > 0)
          {
            //this.router.navigateByUrl('/ui/category/subcategory/' + cat.Id);
          }
          else{
            // this.noRecord = true;
            this.router.navigateByUrl('/ui/category/item/' + CategoryId);
          }
        });
    }
    
    subCategory(cat)
    {
      this.getCategories(cat.Id);
    }
  
  }
  
