import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-mobile-input',
  templateUrl: './mobile-input.component.html',
  styleUrls: ['./mobile-input.component.scss']
})
export class MobileInputComponent implements OnInit {
  mobile: string;
  isFormSubmitted: boolean;
  @Output() onMobileSelect: EventEmitter<string> = new EventEmitter<string>(null);
  @Output() onPasswordMetodSelect: EventEmitter<string> = new EventEmitter<string>(null);
  constructor() { }

  ngOnInit(): void {
    this.isFormSubmitted = false;
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onSubmit(mobileForm: NgForm) {
    this.isFormSubmitted = false;
    if (mobileForm.valid) {
      this.onMobileSelect.next(this.mobile);
    } else {
      this.isFormSubmitted = true;
    }
  }


  loginByPassword(mobileForm: NgForm) {
    this.isFormSubmitted = false;
    if (mobileForm.valid) {
      this.onPasswordMetodSelect.emit(this.mobile);
    }else{
      this.isFormSubmitted = true;
    }
  }
}
