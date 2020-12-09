import { Component, OnInit } from '@angular/core';
import { SkAlertLayout } from '../../interface/sk-alert-layout';
import { SkAlertService } from '../../services/sk-alert.service';

@Component({
  selector: 'app-sk-alert',
  templateUrl: './sk-alert.component.html',
  styleUrls: ['./sk-alert.component.scss']
})
export class SkAlertComponent implements OnInit {
  skAlertLayout: SkAlertLayout;
  constructor(private skAlertService: SkAlertService) {

  }

  ngOnInit(): void {
    setTimeout(() => {
      this.skAlertService.get().subscribe(x => {
        this.skAlertLayout = x;
      });
    }, 100);

  }

  close() {
    this.skAlertService.close();
    this.skAlertService.callWhenClose();
  }
}
