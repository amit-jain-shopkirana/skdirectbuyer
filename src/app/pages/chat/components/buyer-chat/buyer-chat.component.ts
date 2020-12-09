import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ChatAuthService } from 'src/app/shared/services/chat-auth.service';
import { ChatFireStoreService, User } from 'src/app/shared/services/chat-fire-store.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { LocalStogareService } from 'src/app/shared/services/local-stogare.service';
import { environment } from 'src/environments/environment';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-buyer-chat',
  templateUrl: './buyer-chat.component.html',
  styleUrls: ['./buyer-chat.component.scss']
})
export class BuyerChatComponent implements OnInit {
  showSearchSeller: boolean;
  users: Array<any>;
  selectedOtherUsers: Array<any>;
  temp: any; // for handling temporory data from observables.
  message: string = ''; // the  message to be sent
  public messages: Array<any> = [] // messages array/
  showMessages = false; //Toggle to select a conversation.
  loggedInUser: User;
  selectedUser: any;
  selectedChatId: string;
  selectedUserToAdd: any;
  userId: string;

  constructor(private auth: ChatAuthService
    , private api: ChatFireStoreService
    , private localStorageService: LocalStogareService
    , private router: Router
    , private chatService: ChatService
    , private loaderService: LoaderService) { }

  ngOnInit(): void {
    
    this.api.currentUserSubject.subscribe(user => {
      this.loggedInUser = user;
      if (this.loggedInUser && this.loggedInUser.conversations && this.loggedInUser.conversations.length > 0) {
        
        let chatList = this.loggedInUser.conversations.map(x => x.chatId);
        this.api.getChatCount(chatList).subscribe(list => {
          console.log('getChatCount: ', list);
          if(list && list.length > 0){
            this.loggedInUser.conversations.forEach(conv => {
              conv.count = list.filter(x => {
                return x.chatId  == conv.chatId && x.senderId != this.loggedInUser.uid;
              }).length;
            })
          }
        })
      }
      console.log('this.loggedInUser: ', this.loggedInUser);
    })

    this.loaderService.setState(true);
    this.chatService.getMyContact().subscribe(m => {
      let mobile: string = m.MobileNumber;
      console.log('my mobile number is: ', mobile);
      this.auth.login(mobile).then(data => {
        this.loaderService.setState(false);
        console.log('afterlogin user id is: ', data.user.uid);
      
        this.api.setCurrentUser(data.user.uid);
        this.userId = data.user.uid;
        // this.getAllUsers();
      }, error => {
        console.log('afterlogin error is: ', error);
        if (error.code == "auth/user-not-found") {
          this.auth.signup(mobile).then(data => {
            
            this.api.setCurrentUser(data.user.uid);
            this.userId = data.user.uid;

            this.api.createUser(data.user.uid, {
              name: m.Name,
              email: this.auth.getEmail(mobile),
              uid: data.user.uid,
              conversations: []
            }).then(() => {
              this.localStorageService.set(this.localStorageService.chatUserKey, data.user.uid);
              this.api.setCurrentUser(data.user.uid);
              // this.getAllUsers();
            })
          })
        }
      })
    })
  }

  getAllUsers() {
    // this.api.setCurrentUser(this.localStorageService.getItemString(this.localStorageService.chatUserKey)) //setting up the uid in the service for easy access.
    // this.api.getUsers(this.localStorageService.getItemString(this.localStorageService.chatUserKey)).pipe(
    //   map(actions => {
    //     return actions.map(a => {
    //       let data = a.payload.doc.data();
    //       let id = a.payload.doc.data().id;
    //       return { ...data }
    //     })
    //   })
    // ).subscribe(data => {
    //   console.log('data', data)
    //   this.users = data.filter((item) => {
    //     let find = this.api.currentUser.conversations && this.api.currentUser.conversations.find(el => el.uid == item.uid);
    //     if (!find) {
    //       return item;
    //     }
    //   })

    //   console.log( 'this.api.currentUser: ',  this.api.currentUser);


    // })
  }

  onSelectUser(user) {
    console.log('selected user is:', user);

    if (this.api.currentUser.conversations == undefined) {
      //means user has no conversations.
      this.api.currentUser.conversations = [];
    }
    let convo = [...this.api.currentUser.conversations]; //spread operators for ensuring type Array.
    let find = convo.find(item => item.uid == user.uid); // Check If Its the same person who user has talked to before,
    if (find) { // Conversation Found 
      this.selectedUser = null;
      this.selectedChatId = find.chatId;
      // this.router.navigateByUrl('ui/chat/send/' + find.chatId);
    } else {
      this.selectedUser = user;
      this.selectedChatId = null;
      // this.router.navigateByUrl('ui/chat/send/NotFound' );
    }
    this.showMessages = true;
  }

  // onSearchUser(event) {
  //   this.selectedOtherUsers = this.otherUsers.filter(elem => {
  //     return elem.email.toLowerCase().indexOf(event.query) != -1 || elem.name.toLowerCase().indexOf(event.query) != -1;
  //   });
  // }


  onSelectUserFromSearch(user) {
    this.showSearchSeller = false;
    this.onSelectUser(user);
  }

  // selectAUser(user){
  //   console.log('event:', event);
  //   this.selectedUser = user;
  //   this.ch 
  // }

  onCloseShowMessages(){
    this.showMessages = false;
    this.ngOnInit();
  }
  

  navigateToDefaultUrl(){
    this.router.navigateByUrl(environment.defaultUrl);
  }
}
