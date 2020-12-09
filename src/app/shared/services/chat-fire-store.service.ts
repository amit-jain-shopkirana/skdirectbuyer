import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { LoaderService } from './loader.service';


export interface ChatPager {
  take: number,
  chatId: string,
  timestamp?: Date,
  lastDoc: any
}

export interface Chat {
  chatId: any,
  messages: Array<Message>
}

export interface Message {
  senderId: string,
  senderName: string,
  content: string,
  timestamp?: Date
}
export interface UserConvo {
  uid: string,
  name: string,
  chatId: string,
  timestamp?: Date
}
export interface User {
  uid: string,
  name: string,
  email: string,
  conversations?: any[]
}



@Injectable({
  providedIn: 'root'
})
export class ChatFireStoreService {
  constructor(private afs: AngularFirestore, private loaderService: LoaderService) { }
  private temp: any;
  public currentUserSubject: Subject<User> = new Subject<User>();
  public currentUser: User;
  public otherUser;
  public messages = [];

  // public chat: Chat = {
  //   chatId: '',
  //   messages: [],
  // }
  conversationId;

  createUser(uid, data) {
    return this.afs.doc('users/' + uid).set({
      uid: uid,
      name: data.name,
      email: data.email
    })
  }

  updateUser(id, data) {
    return this.afs.doc('users/' + id).update(data);
  }

  setCurrentUser(uid) {
    localStorage.setItem('uid', uid)
    this.afs.doc('users/' + uid).valueChanges().subscribe(resp => {
     
      console.log('resp: ', resp);
      this.temp = resp;
      this.currentUser = this.temp;
      this.currentUserSubject.next(this.currentUser);
    }, err => { console.log('error', err) })
  }

  getCurrentUser() {
    return this.afs.doc('users/' + localStorage.getItem('uid')).valueChanges();
  }

  /* USERS */
  public getUsers(userId) {
    return this.afs.collection<any>('users', ref => ref.where('uid', '==', 'userId')).snapshotChanges();
  }

  /* FINAL CODE */
  getChat(chatId) {
    return this.afs.collection('conversations', ref => ref.where('chatId', '==', chatId)).valueChanges()
  }


  getChatCount(chatIdList) {
    return this.afs.collection<any>('chat', ref => ref.where('isReaded', '==', false).where('chatId', 'in', chatIdList)).valueChanges()
  }


  // && 'senderId' '!=' myUserId 
  // , myUserId
  getChatNew(chatId, date: Date) {
    return this.afs.collection<any>('chat', ref => ref.where('chatId', '==', chatId).where('isReaded', '==', false).where('timestamp', '>', date)).valueChanges();
  }

  readChat(chatId: string, timeStamp: any) {
    return this.afs.collection('chat', ref => ref.where('chatId', '==', chatId).where('timestamp', '==', timeStamp))
      .get().subscribe(x => {
        x.docs.forEach(y => {
          y.ref.update({ isReaded: true });
        })
      });
  }

  refreshCurrentUser() {
    this.afs.collection('users/' + localStorage.getItem('uid')).valueChanges().subscribe(data => {
      this.temp = data;
      this.currentUser = this.temp;
    })
  }

  async addConvo(user, chatId) {
    //data to be added.

    let userMsg = { name: user.name, uid: user.uid, chatId: chatId }
    let otherMsg = { name: this.currentUser.name, uid: this.currentUser.uid, chatId: chatId }
    //first set both references.  
    let myReference = this.afs.doc('users/' + this.currentUser.uid);
    let otherReference = this.afs.doc('users/' + user.uid);
    // Updating my profile 

    myReference.get().subscribe(d => {

      let c = d.data()
      console.log('c', c);
      if (!c.conversations) {
        c.conversations = [];
      }
      c.conversations.push(userMsg);
      myReference.update({ conversations: c.conversations }).then(val => {

        otherReference.get().subscribe(d => {

          let c = d.data()
          console.log('c', c);
          if (!c.conversations) {
            c.conversations = [];
          }
          c.conversations.push(otherMsg);
          return otherReference.update({ conversations: c.conversations })
        })

      })
    })
    // Updating Other User Profile


  }

  addNewChat() {
    const chatId = this.afs.createId();
    return chatId;
    // this.chat = {
    //   chatId: chatId,
    //   messages: []
    // }
    // return this.afs.doc('conversations/' + chatId).set({
    //   chatId: chatId,
    //   messages: []
    // }).then(() => {
    //   this.chat = {
    //     chatId: chatId,
    //     messages: []
    //   }
    // })
  }

  pushNewMessage(list, chatId) {
    console.log('this-chat-x-x-x-x-x-x-',)
    return this.afs.doc('conversations/' + chatId).update(
      { messages: list }
    )
  }

  pushNewMessageNew(message, chatId) {
    // console.log('this-chat-x-x-x-x-x-x-', this.chat)
    message.chatId = chatId;
    return this.afs.collection('chat').add(message)
  }

  getOldChatMessage(chatPager: ChatPager) {

    // .where('isReaded', '==', false)
    return this.afs.collection('chat', ref => ref
      .where('chatId', '==', chatPager.chatId)
      .where('timestamp', '<', chatPager.timestamp)
      .orderBy('timestamp', 'desc')
      .limit(chatPager.take)
    ).get()

  }



  clearData() {
    localStorage.clear();
    this.messages = []
    this.currentUser = {
      conversations: [],
      name: '',
      email: '',
      uid: ''
    }
    // this.chat = null;
    this.temp = null;

  }

}
