import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category-seller-widget',
  templateUrl: './category-seller-widget.component.html',
  styleUrls: ['./category-seller-widget.component.scss']
})
export class CategorySellerWidgetComponent implements OnInit {
  @Input() topCategoryList: any[];  
  baseUrl: string;
  constructor(private router: Router) {this.baseUrl = environment.apiBaseUrl; }

  ngOnInit(): void {
    console.log('topCategoryList: ', this.topCategoryList);
  }
  categoryPage()
  {
    this.router.navigateByUrl('/ui/category/category');
  }
  itemList(category)
  {
    this.router.navigateByUrl('/ui/category/item/' + category.Id);
  }


  imageNotFound(category){
    category.notFound = true;
    console.log('imageNotFound: ', category);
  }
}
