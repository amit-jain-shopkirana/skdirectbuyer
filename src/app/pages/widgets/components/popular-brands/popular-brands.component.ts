import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-popular-brands',
  templateUrl: './popular-brands.component.html',
  styleUrls: ['./popular-brands.component.scss']
})
export class PopularBrandsComponent implements OnInit {
  @Input() topPopularBrandList: any[];  
  baseUrl: string;
  constructor(private router: Router) {this.baseUrl = environment.apiBaseUrl; }

  ngOnInit(): void {
    console.log('topPopularBrandList: ', this.topPopularBrandList);
  }

  viewAllBrands(){
    this.router.navigateByUrl('/ui/category/brand');
  }
  itemList(category)
  {
    this.router.navigateByUrl('/ui/category/item/' + category.Id + '/' + 0);
  }

}
