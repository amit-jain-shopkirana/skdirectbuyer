import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ChatAuthService {
  password: string = 'abc123';
  constructor(private afAuth: AngularFireAuth) { }


  public login(mobile: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(this.getEmail(mobile), this.password)
  }

  public signup(mobile: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(this.getEmail(mobile), this.password)
  }

  getEmail(mobile: string) {
    return mobile + '@' + mobile + '.com';
  }
}
