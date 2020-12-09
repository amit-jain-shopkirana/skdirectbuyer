import { Component, OnInit, Input } from '@angular/core';
import { slideAnimation } from '../../amimation/slide.animation';

import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';
import { AppHomeWidgetDc } from 'src/app/pages/app-home/interfaces/app-home-widget-dc';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-horizontal-slider',
  templateUrl: './horizontal-slider.component.html',
  styleUrls: ['./horizontal-slider.component.scss'],
  animations: [slideAnimation]
})
export class HorizontalSliderComponent implements OnInit {
  @Input() widget: AppHomeWidgetDc;
  @Input() numberOfSlides: number = 3;
  currentIndex = 0;
  slides: any[];
  slideAll: any[];
  constructor() { }

  ngOnInit(): void {
    this.slides = this.widget.WidgetConfList.map(x => new Object({ image: environment.apiBaseUrl + x.ImagePath, description: environment.apiBaseUrl + x.ImagePath }))
    this.slideAll = JSON.parse(JSON.stringify(this.slides));
    this.preloadImages();
  }


  prevSlide() {
    
    alert(this.currentIndex )
    this.currentIndex = (this.currentIndex < this.slides.length - 1) ? ++this.currentIndex : 0;
  }

  nextSlide() {
    alert(this.currentIndex )
    this.currentIndex = (this.currentIndex > 0) ? --this.currentIndex : this.slides.length - 1;
  }

  isCurrentSlideIndex(index) {
    return this.currentIndex === index;
  }

  preloadImages() {
    this.slides = [];
    debugger;
    this.slideAll.forEach(slide => {
      (new Image()).src = slide.image;
    });
    
    let count: number = 0;
    let totalLoop: number = this.slideAll.length / 3;
    
    totalLoop = parseInt(totalLoop.toString())
    while (count < totalLoop) {
      let item = [];
      if (this.slideAll.length > 3 * count) {
        
        item.push(this.slideAll[3 * count]);
      }
      if (this.slideAll.length > (3 * count + 1)) {
        item.push(this.slideAll[3 * count + 1]);
      }
      if (this.slideAll.length > (3 * count + 2)) {
        item.push(this.slideAll[3 * count + 2]);
      }
      this.slides.push(item);
      count++;
    }

    let item = [];
    if (this.slideAll.length > 3 * count) {
      item.push(this.slideAll[3 * count]);
    }
    if (this.slideAll.length > (3 * count + 1)) {
      item.push(this.slideAll[3 * count + 1]);
    }
    if (this.slideAll.length > (3 * count + 2)) {
      item.push(this.slideAll[3 * count + 2]);
    }
    if(item.length > 0){
      this.slides.push(item);
    }
  

  }
}
