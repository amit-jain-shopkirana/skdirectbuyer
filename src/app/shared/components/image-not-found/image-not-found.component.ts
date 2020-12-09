import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-not-found',
  templateUrl: './image-not-found.component.html',
  styleUrls: ['./image-not-found.component.scss']
})
export class ImageNotFoundComponent implements OnInit {
  @Input() imageFullPath: string;
  @Input() imageType: string;    // item , store, 
  isImageFound: boolean;
  constructor() { }

  ngOnInit(): void {
    if(!this.imageType || this.imageType == 'item'){
      this.imageType = 'assets/images/not_found/lost-items.svg';
    }else if(this.imageType == 'store'){
      this.imageType = 'assets/images/not_found/store.svg';
    }
    this.isImageFound = true;
  }

  imageNotFound() {
    this.isImageFound = false;
    
  }
}
