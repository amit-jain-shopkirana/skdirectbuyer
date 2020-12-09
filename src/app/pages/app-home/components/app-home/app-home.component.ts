import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppHomeService } from '../../services/app-home.service';
import { AppHomeDc } from '../../interfaces/app-home-dc';
import { WindowService } from 'src/app/shared/services/window.service';

@Component({
  selector: 'app-app-home',
  templateUrl: './app-home.component.html',
  styleUrls: ['./app-home.component.scss']
})
export class AppHomeComponent implements OnInit {
  appHomeId: number;
  // appHome: AppHomeDc;
  appHome: any;

  sellerIdEncoded: string = encodeURI('U2FsdGVkX1%2fv4PYK9WGjirRC2KE27Hm01gtWW9ccWlM%3d')

  constructor(private route: ActivatedRoute, private appHomeService: AppHomeService, private windowService: WindowService) {
    this.route.params.subscribe(params => {
      this.appHomeId = params['apphomeId'];
    });

  }

  ngOnInit(): void {
    if (this.appHomeId) {
      // this.appHomeService.getAppHome(1).subscribe(x => {
      //   console.log('this.appHomeId: ', x );
      //   this.appHome = x;
      // });
      this.appHomeService.getBuyerAppHome().subscribe(x => {
        this.appHome = x;
      });
    }
  }

}
