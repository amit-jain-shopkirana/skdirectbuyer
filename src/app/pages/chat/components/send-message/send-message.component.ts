import { Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscribable, Subscription } from 'rxjs';
import { ChatFireStoreService, ChatPager } from 'src/app/shared/services/chat-fire-store.service';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { LocalStogareService } from 'src/app/shared/services/local-stogare.service';



@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent implements OnInit, OnDestroy {

  getChatMessageNewObservable: Subscription;
  chatPager: ChatPager;
  @Input() chatId: string;
  @Input() user: any;
  @Output() onBack: EventEmitter<boolean> = new EventEmitter<boolean>();
  temp: any; // for handling temporory data from observables.
  message: string = ''; // the  message to be sent
  currentMessages: any[];
  public messages: Array<any> = [] // messages array/
  myUserId: string;
  @ViewChild('target') private myScrollContainer: ElementRef;
  pageOpenTime: Date;
  @ViewChild('sendInput') searchElement: ElementRef;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  forFirstTime: boolean = true;
  @HostListener("window:scroll", ["$event"])
  onWindowScroll(scr) {
    const container = document.querySelector('.ar-bd')

    if (container.scrollTop == 0 && this.currentMessages && this.currentMessages.length > 0) {

      this.chatPager.timestamp = this.currentMessages[0].timestamp;
      this.getOldMessages();
    }
  }


  constructor(private route: ActivatedRoute
    , private api: ChatFireStoreService
    , private localStorageService: LocalStogareService
    , private el: ElementRef
    , private layoutService: LayoutService) { }



  // @HostListener('scroll', ['$event']) onScroll(e) {
  //   console.log(this.el.nativeElement.scrollTop)
  // }


  ngOnInit(): void {
    this.layoutService.setModel({
      showBottomNavigation: false,
      showTopNavigation: false
    })
    this.currentMessages = [];
    this.pageOpenTime = new Date();
    this.myUserId = this.localStorageService.getItemString(this.localStorageService.chatUserKey);
    this.chatPager = {
      lastDoc: null,
      take: 10,
      chatId: null,
      timestamp: this.pageOpenTime
    }
    this.getChatMessages();
  }

  ngOnDestroy() {
    this.getChatMessageNewObservable.unsubscribe();
  }

  getChatMessages() {
    if (this.chatId) { // Conversation Found 
      this.chatPager.chatId = this.chatId;
      // this.api.chat.chatId = this.chatId;
      this.getOldMessages();
    } else {
      /* User is talking to someone for the very first time. */
      // this.api.addNewChat().then(async () => { // This will create a chatId Instance. 
      this.chatId = this.api.addNewChat();
      //passing other user info

      this.api.addConvo(this.user, this.chatId).then(x => {
        this.getNewChatMessages();
      })

    }

  }

  getOldMessages() {
 
    this.api.getOldChatMessage(this.chatPager).subscribe(x => {
      let oldMessageList = [];
      if (x && x.docs && x.docs.length > 0) {
        x.docs.forEach(element => {
          let msg = element.data();
          oldMessageList.push(msg);
          this.setIfMsgNotReaded(msg);
        });
        oldMessageList = oldMessageList.reverse();
        if (this.currentMessages && this.currentMessages.length > 0) {
          this.currentMessages = oldMessageList.concat(this.currentMessages);
        } else {
          this.currentMessages = oldMessageList;
        }

        console.log(' this.messagesssss 1    ', this.messages);
      }
      if (this.forFirstTime) {
        this.scrollToElement();
        this.forFirstTime = false;
        this.getNewChatMessages();
      }
      else if (x.docs && x.docs.length > 0) {
        this.scrollToCurrentElement(x.docs.length);
      }

    })
  }



  sendMessage() {
    this.searchElement.nativeElement.focus();
    // If message string is empty
    if (this.message == '') {
      alert('Enter message');
      return
    }
    //set the message object 
    let msg = {
      senderId: this.api.currentUser.uid,
      senderName: this.api.currentUser.name,
      timestamp: new Date(),
      content: this.message,
      isReaded: false
    };
    //empty message
    this.message = '';
    //update 
    this.messages.push(msg);
    console.log('list', msg);
    // this.api.pushNewMessage(this.messages).then(() => {
    //   console.log('sent');
    // })
    this.api.pushNewMessageNew(msg, this.chatId).then(() => {
      console.log('sent');
      
    })
  }

  back() {
    this.onBack.emit(true);
  }

  private setCurrentMessages() {
    // if (this.messages && this.messages.length > 0) {
    //   this.messages.sort(function (x, y) {
    //     return x.timestamp.toDate() - y.timestamp.toDate();
    //   })
    //   this.messages = this.messages.reverse()
    //   console.log('messages are:', this.messages)
    //   let curMessages = this.messages.slice(this.chatPager.skip, this.chatPager.skip + this.chatPager.take - 1);
    //   curMessages = curMessages.reverse();
    //   this.currentMessages = [];
    //   this.currentMessages = curMessages.concat(this.currentMessages)
    //   console.log('currentMessages are:', this.currentMessages)
    // }
  }


  private getNewChatMessages() {
    this.getChatMessageNewObservable = this.api.getChatNew(this.chatId, this.pageOpenTime)
      .subscribe(msgList => {
        if (msgList && msgList.length > 0) {
          msgList.forEach(msg => {
            this.setIfMsgNotReaded(msg);

            if (!this.currentMessages || this.currentMessages.length == 0) {
              this.currentMessages = [];
            }
            let isFound = this.currentMessages.filter(x => x.timestamp.nanoseconds == msg.timestamp.nanoseconds && x.timestamp.seconds == msg.timestamp.seconds)
            if (isFound.length < 1) {
              this.currentMessages.push(msg);
            }
            this.scrollToElement();
          })
        }
      })
  }


  scrollToElement(): void {

    setTimeout(() => {
      this.myScrollContainer.nativeElement.scroll({
        top: this.myScrollContainer.nativeElement.scrollHeight,
        left: 0,
        behavior: 'smooth'
      });
    }, 100);

  }


  scrollToCurrentElement(itemCount): void {

    setTimeout(() => {
      let height = this.myScrollContainer.nativeElement.scrollHeight - (this.myScrollContainer.nativeElement.scrollHeight / (itemCount + 1));
      this.myScrollContainer.nativeElement.scroll({

        top: this.myScrollContainer.nativeElement.scrollHeight -(this.myScrollContainer.nativeElement.scrollHeight - 10),
        left: 0,
        behavior: 'smooth'
      });
    }, 100);
  }

  private setIfMsgNotReaded(msg) {
    if (this.myUserId != msg.senderId && !msg.isReaded) {
      this.api.readChat(this.chatPager.chatId, msg.timestamp);
      console.log(' this.messagesssss 1    ', this.messages);
    }
  }

  onScrollDown() {
    console.log('aaa')
  }
  onScrollUp() {
    console.log('upppp')
    this.chatPager.timestamp = this.currentMessages[0].timestamp; 
    this.getOldMessages();
  }

}
