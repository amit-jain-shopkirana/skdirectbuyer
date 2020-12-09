import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-placed',
  templateUrl: './order-placed.component.html',
  styleUrls: ['./order-placed.component.scss']
})
export class OrderPlacedComponent implements OnInit {
  addressList : any;
  radioSel:any;
  radioSelected:string;
  radioSelectedString:string;
  sellerId : string;
  placed : any;

  constructor(  private router: Router,
    // public dialogRef: MatDialogRef<OrderPlacedComponent>,private router: Router,
    // @Inject(MAT_DIALOG_DATA) public message: string,
    ) { }

  ngOnInit(): void { 
  }
  onNoClick(): void {
    // this.dialogRef.close();
  }
  sellerPage()
  {
    this.placed = 1;
    this.sellerId = 'U2FsdGVkX1%2BXahQtE8OvF3a4c%2BGpcrNVqkIAPpEKc1M%3D';
    // this.router.navigateByUrl('ui/seller/' + this.sellerId);
    this.router.navigateByUrl('ui/seller/' + this.placed + '/' + this.sellerId);
  }

}
