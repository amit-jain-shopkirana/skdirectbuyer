import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-login-method-input',
  templateUrl: './login-method-input.component.html',
  styleUrls: ['./login-method-input.component.scss']
})
export class LoginMethodInputComponent implements OnInit {

  @Output() onLoginMethodSelected: EventEmitter<boolean> = new EventEmitter<boolean>(null);

  constructor() { }

  ngOnInit(): void {
  }

  loginMethodSelect(isPasswordLogin: boolean) {
    this.onLoginMethodSelected.next(isPasswordLogin);
  }
}
