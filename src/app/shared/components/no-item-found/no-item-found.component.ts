import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-item-found',
  templateUrl: './no-item-found.component.html',
  styleUrls: ['./no-item-found.component.scss']
})
export class NoItemFoundComponent implements OnInit {
  @Input() header: string;
  @Input() body: string;
  constructor() { }

  ngOnInit(): void {
  }

}
