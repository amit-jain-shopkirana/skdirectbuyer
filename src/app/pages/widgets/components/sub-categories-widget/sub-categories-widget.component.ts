import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sub-categories-widget',
  templateUrl: './sub-categories-widget.component.html',
  styleUrls: ['./sub-categories-widget.component.scss']
})
export class SubCategoriesWidgetComponent implements OnInit {
  @Input() topSubCategoryList: any[];  
  baseUrl: string;
  constructor(private router: Router) {this.baseUrl = environment.apiBaseUrl; }

  ngOnInit(): void {
    console.log('topSubCategoryList: ', this.topSubCategoryList);
  }

  viewAllSellers(){
    this.router.navigateByUrl('ui/seller');
  }

}
