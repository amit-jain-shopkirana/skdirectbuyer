import { Component, OnInit, Inject } from '@angular/core';
import { ConfirmDialogService } from './confirm-dialog.service';
import { ConfirmModel } from './confirm-model';



export interface DialogData {
  title: string;
  message: string;
}


@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  confirmModel: ConfirmModel;
  constructor(
    private confirmDialogService: ConfirmDialogService
    // public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {


  }

  ngOnInit() {
    this.confirmDialogService.confirModelObserver.subscribe(x => {
      this.confirmModel = x;
    })
  }

  onConfirm(): void {
    this.confirmDialogService.reset();
    this.confirmDialogService.accept();
    // Close the dialog, return true
    // this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.confirmDialogService.reset();
    this.confirmDialogService.cancel();

    // Close the dialog, return false
    // this.dialogRef.close(false);
  }
}
