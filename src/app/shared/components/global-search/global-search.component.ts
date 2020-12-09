import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalSearchService } from '../../services/global-search.service';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-global-search',
  templateUrl: './global-search.component.html',
  styleUrls: ['./global-search.component.scss']
})
export class GlobalSearchComponent implements OnInit {

  globalSearchKeywordEvent: Observable<string>;

  constructor(private layoutService: LayoutService
    , private globalSearchService: GlobalSearchService) {


    this.layoutService.setModel({
      showBottomNavigation: false,
      showTopNavigation: true
    });


   
  }

  ngOnInit(): void {

  }

}
