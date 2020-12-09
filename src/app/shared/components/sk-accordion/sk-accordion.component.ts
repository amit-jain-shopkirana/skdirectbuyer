import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sk-accordion',
  templateUrl: './sk-accordion.component.html',
  styleUrls: ['./sk-accordion.component.scss'],
  animations: [
    trigger('smoothCollapse', [
      state('initial', style({
        height: '0',
        opacity: 0,
        overflow: 'hidden',
        visibility: 'hidden'
      })),
      state('final', style({
        overflow: 'hidden'
      })),
      transition('initial <=> final', animate('350ms') )
    ])
  ]
})
export class SkAccordionComponent implements OnInit {

 @Input() showContent : boolean;
  @Output() onToggle = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  toggle(){
    this.showContent = !this.showContent;
    this.onToggle.emit(this.showContent);
  }
}

