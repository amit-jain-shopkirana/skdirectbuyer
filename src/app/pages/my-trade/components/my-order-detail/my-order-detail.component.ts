import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogService } from 'src/app/shared/components/confirm-dialog/confirm-dialog.service';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { SkAlertService } from 'src/app/shared/services/sk-alert.service';
import { environment } from 'src/environments/environment';
import { OrderMasterFilter } from '../../interface/orderMasterFilter';
import { MyOrderService } from '../../services/my-order.service';

@Component({
  selector: 'app-my-order-detail',
  templateUrl: './my-order-detail.component.html',
  styleUrls: ['./my-order-detail.component.scss']
})
export class MyOrderDetailComponent implements OnInit {
  orderMasterFilter: OrderMasterFilter;
  OrderId: any;
  orderDetailList: any;
  baseUrl: string;
  orderData: any;
  cancelMode: boolean = false;

  constructor(private myOrderService: MyOrderService, private route: ActivatedRoute
    , private layoutService: LayoutService, private confirmationService: ConfirmDialogService
    , private loaderService: LoaderService
    , private router: Router, private skAlertService: SkAlertService) { this.baseUrl = environment.apiBaseUrl; }

  ngOnInit(): void {
    this.initializeLayout();
    this.route.paramMap.subscribe(params => {
      this.OrderId = params.get('Id');
    });
    this.cancelMode = false;
    this.loaderService.setState(true);
    this.myOrderService.getOrderDetails(this.OrderId).subscribe(c => {
      this.loaderService.setState(false);
      console.log('orderDetail', c);
      this.orderDetailList = c;
    })
    this.loaderService.setState(true);
    this.myOrderService.GetOrderDetailProcess(this.OrderId).subscribe(res => {
      this.loaderService.setState(false);
      this.orderData = res;
      if (this.orderData.Status == 1) {
        this.cancelMode = true;
      }
      console.log('orderDataorderData', res);
    })

  }

  myOrder() {
    this.router.navigateByUrl('ui/my-trade/my-order');
  }

  private initializeLayout() {
    this.layoutService.setModel({
      showBottomNavigation: true,
      showTopNavigation: false,
      // isShowFullLengthContainer: false
    });
  }

  statusChange() {
    this.confirmationService.confirm({
      bodyMessage: 'Are you sure that you want to cancel this order?',
      headerMessage: ''
    }).subscribe(() => {
      this.loaderService.setState(true);
      this.myOrderService.cancelOrder(this.OrderId).subscribe(x => {
        this.loaderService.setState(false);
        this.skAlertService.open({
          bodyMessage: 'You Order is Cancelled Successfully!',
          headerMessage: '',
          isShowAlert: true
        }).subscribe(() => {
          this.ngOnInit();
          this.router.navigateByUrl('ui/my-trade/my-order');
        })
      });
    });
  }

}
