import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderRatingDC } from '../../interface/orderRatingDC';
import { MyOrderService } from '../../services/my-order.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss']
})
export class AddReviewComponent implements OnInit {
  OrderId : any;
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number = 0;
  Comment :any;
  orderRatingDC : OrderRatingDC;
  constructor(private route: ActivatedRoute,private router: Router,private myOrderService : MyOrderService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.OrderId = params.get('Id');
    });
  }

  myOrder()
  {
    this.router.navigateByUrl('ui/my-trade/my-order');
  }

  submit(Comment)
  {
    this.orderRatingDC = {
      Rating : this.selectedValue,
      Comment : Comment,
      Id : this.OrderId
    }
    this.myOrderService.rating(this.orderRatingDC).subscribe(res=>
      {
        if(res == true)
        {
          this.router.navigateByUrl('ui/my-trade/my-order');
        }
        console.log('rating',res);
      })
  
    }
  
  countStar(star) {
      this.selectedValue = star;
      console.log('Value of star3', this.selectedValue);
    }
  
  addClass(star) {
     let ab = "";
     for (let i = 0; i < star; i++) {
       ab = "starId" + i;
       document.getElementById(ab).classList.add("selected");
       console.log('ab',ab);
       console.log('Value of star2', this.selectedValue);
     }
  }
  removeClass(star) {
     let ab = "";
     for (let i = star-1; i >= this.selectedValue; i--) {
       ab = "starId" + i;
       document.getElementById(ab).classList.remove("selected");
     }
     console.log('Value of star1', this.selectedValue);
    }
  
}
