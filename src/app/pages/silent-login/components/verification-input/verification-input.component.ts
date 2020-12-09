import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { interval } from 'rxjs/internal/observable/interval';

@Component({
  selector: 'app-verification-input',
  templateUrl: './verification-input.component.html',
  styleUrls: ['./verification-input.component.scss']
})
export class VerificationInputComponent implements OnInit {
  @Input() isPasswordLogin: boolean;
  @Output() onSubmitOtpEvent: EventEmitter<string> = new EventEmitter<string>(null);
  @Output() onSubmitPasswordEvent: EventEmitter<string> = new EventEmitter<string>(null);
  inputArray: string[];
  otpString: string;
  extraTimeCount: number;
  isFormInvalid: boolean;
  password: string;
  @Input() MobileNumber : any;
  @Input() WrongOTP : boolean;
  @ViewChild("input1") input1: ElementRef;
  @ViewChild("input2") input2: ElementRef;
  @ViewChild("input3") input3: ElementRef;
  @ViewChild("input4") input4: ElementRef;
  @ViewChild("button1") buttonInput: ElementRef;
  @Output() onLoginMethodSelected: EventEmitter<boolean> = new EventEmitter<boolean>(null);
  remainingTimeString: string;
  remainingTimeInSec: number;
  remainingTimeWatch: any;
  constructor() { }

  ngOnInit(): void {
    this.isFormInvalid = false;
    this.extraTimeCount = 0;
    this.inputArray = [null, null, null, null]
    this.otpString = '';
    this.initializeRemainingTime();


  }

  onKeyUp(event, index){
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  onKeyUp1(event, index) { 
    if (event.key == "Backspace") {
      switch (index) {
        case 0:
          this.input1.nativeElement.focus();
          break;
        case 1:
          this.input1.nativeElement.focus();
          break;
        case 2:
          this.input2.nativeElement.focus();
          break;
        case 3:
          this.input3.nativeElement.focus();
          break;
      }
    }
    else if (event.keyCode >= 48 && event.keyCode <= 57) {
      switch (index) {
        case 0:
          this.input2.nativeElement.focus();
          break;
        case 1:
          this.input3.nativeElement.focus();
          break;
        case 2:
          this.input4.nativeElement.focus();
          break;
        case 3:
          this.buttonInput.nativeElement.focus();
          break;
      }
    } else {

      // this.inputArray[index] = null;
      event.stopPropagation();
      return false;
    }
    return true;
  }

  onInputChange(index) {

    if (!(this.inputArray[index] && this.inputArray[index].length > 0)) {
      this.inputArray[index] = null;
    }

    if (!this.inputArray[index] ) {
      switch (index) {
        case 0:
          this.input1.nativeElement.focus();
          break;
        case 1:
          this.input1.nativeElement.focus();
          break;
        case 2:
          this.input2.nativeElement.focus();
          break;
        case 3:
          this.input3.nativeElement.focus();
          break;
      }
    }
    else if (this.inputArray[index] >= '0' && this.inputArray[index] <= '9') {
      switch (index) {
        case 0:
          this.input2.nativeElement.focus();
          break;
        case 1:
          this.input3.nativeElement.focus();
          break;
        case 2:
          this.input4.nativeElement.focus();
          break;
        case 3:
          this.buttonInput.nativeElement.focus();
          break;
      }
    } else {

      // this.inputArray[index] = null;
      this.inputArray[index]=null;
      // return false;
    }

    this.makeOtpString();
  }

  makeOtpString() {
    this.otpString = '';
    this.otpString += this.inputArray[0] && this.inputArray[0].length > 0 ? this.inputArray[0].toString() : '';
    this.otpString += this.inputArray[1] && this.inputArray[1].length > 0 ? this.inputArray[1].toString() : '';
    this.otpString += this.inputArray[2] && this.inputArray[2].length > 0 ? this.inputArray[2].toString() : '';
    this.otpString += this.inputArray[3] && this.inputArray[3].length > 0 ? this.inputArray[3].toString() : '';
  }

  resendOtp() {
    this.extraTimeCount++;
    this.onLoginMethodSelected.next(false);
    this.initializeRemainingTime();
  }

  onSubmitOtp() {
    if (this.otpString && this.otpString.length == 4) {
      this.isFormInvalid = false;
      this.onSubmitOtpEvent.next(this.otpString);
    } else {
      this.isFormInvalid = true;
    }
  }

  onSubmitPassword(form: NgForm) {
    if(form.submitted && form.valid){
      this.onSubmitPasswordEvent.next(this.password);
    }
  }

  private initializeRemainingTime() {
    const subscribe = interval(1000);
    this.remainingTimeInSec = 45 + (this.extraTimeCount * 30);
    this.remainingTimeString = this.getTimeString(this.remainingTimeInSec);
    this.remainingTimeWatch = subscribe.subscribe(val => {
      this.remainingTimeInSec--;
      this.remainingTimeString = this.getTimeString(this.remainingTimeInSec);

      if (!this.remainingTimeInSec) {
        this.remainingTimeWatch.unsubscribe();
      }
    });

  }

  private getTimeString(timeInSec: number): string {

    if (!timeInSec) {
      return '00:00';
    } else {
      let timeString = '';
      let min = parseInt((timeInSec / 60).toString());
      if (min <= 9) {
        timeString = '0' + min.toString();
      } else {
        timeString = min.toString();
      }

      let sec = timeInSec % 60;
      if (sec <= 9) {
        timeString += ':0' + sec.toString();
      } else {
        timeString += ':' + sec.toString();
      }
      return timeString;

    }
  }
}
