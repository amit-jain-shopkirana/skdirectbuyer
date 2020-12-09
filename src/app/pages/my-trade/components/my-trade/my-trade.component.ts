import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { environment } from 'src/environments/environment';
import { OrderMasterDC } from '../../interface/order-master-dc';
import { OrderMasterFilter } from '../../interface/order-master-filter';
import { MyTradeService } from '../../services/my-trade.service';

@Component({
  selector: 'app-my-trade',
  templateUrl: './my-trade.component.html',
  styleUrls: ['./my-trade.component.scss']
})
export class MyTradeComponent implements OnInit {
  filter: OrderMasterFilter;
  orderList: OrderMasterDC[];
  apiurl: string;
  constructor(private myTradeService: MyTradeService
    , private loaderService: LoaderService) {
    this.apiurl = environment.apiBaseUrl;
  }

  ngOnInit(): void {
    this.filter = {
      Status: 1,
      Id: null
    }
  

    this.loaderService.setState(true);
    this.myTradeService.getOrderMaster(this.filter).subscribe(x => {
      console.log('x is: ', x);
      this.orderList = x;
      this.updateOrderListImage();
      this.loaderService.setState(false);
    });
  }

  private updateOrderListImage() {
    let basePath = 'assets/images/orderStatus/';
    if (this.orderList && this.orderList.length > 0) {
      this.orderList.forEach(element => {
        if(element.OrderStatus.toLowerCase().trim() == 'pending'){
          element.image = basePath + 'pending.png';
        }else if(element.OrderStatus.toLowerCase().trim() == 'shipped'){
          element.image = basePath + 'shipped.png';
        }else if(element.OrderStatus.toLowerCase().trim() == 'delivered'){
          element.image = basePath + 'delivered.png';
        }else if(element.OrderStatus.toLowerCase().trim() == 'cancelled'){
          element.image = basePath + 'cancel.png';
        }
      });
    }
  }
}
