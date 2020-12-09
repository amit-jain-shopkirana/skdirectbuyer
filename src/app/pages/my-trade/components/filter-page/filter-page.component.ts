import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-filter-page',
  templateUrl: './filter-page.component.html',
  styleUrls: ['./filter-page.component.scss']
})
export class FilterPageComponent implements OnInit {
  searchData : any;
  FromDate : Date;
  ToDate : Date;
  display = true;

  @Output() onFilterSelect: EventEmitter<string> = new EventEmitter<string>(null);
  constructor() {this.searchData = {}; }

  ngOnInit(): void {
  }
  filter(searchData) {
      this.onFilterSelect.next(this.searchData)
  }
  filterData($event)
  {

  }
}
