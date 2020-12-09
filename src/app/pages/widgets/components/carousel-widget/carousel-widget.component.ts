import { Component, OnInit, Input } from '@angular/core';
import { slideAnimation } from '../../amimation/slide.animation';
import { AppHomeWidgetDc } from 'src/app/pages/app-home/interfaces/app-home-widget-dc';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-carousel-widget',
  templateUrl: './carousel-widget.component.html',
  styleUrls: ['./carousel-widget.component.scss'],
  animations: [slideAnimation]
})
export class CarouselWidgetComponent implements OnInit {
  @Input() widget: AppHomeWidgetDc;
  @Input() timeInSec: number = 3;
  currentIndex = 0;
  slides: any[];
  isopenPopup : boolean;
  Img: any;
  constructor() {
  }

  ngOnInit() {
    this.slides = this.widget.WidgetConfList.map(x => new Object({ image: environment.apiBaseUrl + x.ImagePath, description: environment.apiBaseUrl + x.ImagePath }))
    
    console.log('this.slides : ', this.slides );
    this.preloadImages();
    this.autoSlide();
  }

  preloadImages() {
    this.slides.forEach(slide => {
      (new Image()).src = slide.image;
    });
  }

  setCurrentSlideIndex(index) {
    this.currentIndex = index;
  }

  isCurrentSlideIndex(index) {
    return this.currentIndex === index;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex < this.slides.length - 1) ? ++this.currentIndex : 0;
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex > 0) ? --this.currentIndex : this.slides.length - 1;
  }

  autoSlide() {
    setTimeout(() => {
      this.currentIndex = (this.currentIndex > 0) ? --this.currentIndex : this.slides.length - 1;
      this.autoSlide();
    }, this.timeInSec * 1000);
  }
  openImg(image)
  {
    this.isopenPopup = true;
    this.Img = image;
  }
}
