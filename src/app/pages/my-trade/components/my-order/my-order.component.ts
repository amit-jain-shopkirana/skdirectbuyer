import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { SkAlertService } from 'src/app/shared/services/sk-alert.service';
import { OrderMasterFilter } from '../../interface/orderMasterFilter';
import { OrderFilter } from '../../interface/orderRatingDC';
import { MyOrderService } from '../../services/my-order.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss']
})
export class MyOrderComponent implements OnInit {
  orderMasterFilter : OrderMasterFilter;
  OrderId : number;
  buyOrder : any;
  display = false;
  searchData : any;
  monthlyData : boolean = false;
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number = 0;
  orderFilter : OrderFilter;
  rows : number;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  start : boolean = false;
  end : boolean = false;
  // orderDetail : boolean = false;

  constructor(private myOrderService : MyOrderService,private layoutService: LayoutService
    ,private router: Router, private loaderService : LoaderService
    , private skAlertService: SkAlertService) { this.searchData = {};}

  ngOnInit(): void {
    this.initializeLayout();
    this.searchData.FromDate = null;
    this.searchData.ToDate = null;
    this.searchData = [];
    this.start = false;
    this.end = false;
    // this. orderFilter.Status = 0;
    this.orderMasterFilter = {
      Id : 0,
      Status : 0,
      Skip : 0,
      Take : 10,
      SellerId : 0,
      FromDate : null,
      ToDate : null,
      Filter : ''
    }
    this.loaderService.setState(true);
    this.myOrderService.getOrderMaster(this.orderMasterFilter).subscribe(x=>
      {
        this.loaderService.setState(false);
        console.log('ordermaster',x);
        this.buyOrder = x;
        this.monthlyData = false;
        this.display = false;
      })
      this.orderFilter = {
        Orderid: 0,
        Status: 0,
        Skip: 0,
        Take: this.rows
      }
  }
  filterStatus(status) {
    if(status == "")
    {
      status = 0;
      this.searchData.status = status;
    }
    this.searchData.status = status;
    this.orderFilter.Status = status;
  }
  filterData(data)
  {
    data.FromDate = data ? data.FromDate : null;
    data.ToDate = data ? data.ToDate : null;
    if(data.FromDate != null && data.ToDate == null || data.FromDate == null && data.ToDate != null)
    {
      if(data.FromDate == null)
      {
        this.start = true;
        this.end = false;
      }
      if(data.ToDate == null)
      {
        this.end = true;
        this.start = false;
      }
      
      this.skAlertService.open({
        bodyMessage: 'Start Date And End Date is mandatory',
        headerMessage: '',
        isShowAlert: true
      }).subscribe(() => {
      })
    }
    else{
    this.orderMasterFilter = {
      Id : data ? data.OrderId : 0,
      Status : data ? data.status : 0,
      Skip : 0,
      Take : 10,
      SellerId : 0,
      FromDate : data ? data.FromDate : 0,
      ToDate : data ? data.ToDate : 0,
      Filter : ''
    }
    this.start = false;
        this.end = false;
    this.loaderService.setState(true);
    this.myOrderService.getOrderMaster(this.orderMasterFilter).subscribe(x=>
      {
        this.loaderService.setState(false);
        console.log('ordermaster',x);
        this.buyOrder = x;
        this.display = false;
        this.monthlyData = true;
      })
    }
  }

  onScrollDown() {
    console.log('onScrollDown');
    this.orderMasterFilter.Skip = this.orderMasterFilter.Skip + this.orderMasterFilter.Take;
    this.loaderService.setState(true);
    this.myOrderService.getOrderMaster(this.orderMasterFilter).subscribe(x => {
      this.loaderService.setState(false);
      if(x && x.length > 0 ){
        this.buyOrder = this.buyOrder.concat(x) ;
        this.display = false;
      }
    });
    
  }

  myOrder(cart)
  {
    this.router.navigateByUrl('ui/my-trade/order-detail/' + cart.Id);
  }

  private initializeLayout() {
    this.layoutService.setModel({
      showBottomNavigation: true,
      showTopNavigation: false,
      // isShowFullLengthContainer: false
    });
  }

  addReview(cart)
  {
    this.router.navigateByUrl('ui/my-trade/review/' + cart.Id);
  }
  appRoute()
  {
    this.router.navigateByUrl('ui/app-home/1');
  }

}
