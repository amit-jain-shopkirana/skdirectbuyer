import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { error } from 'protractor';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ChatAuthService } from 'src/app/shared/services/chat-auth.service';
import { ChatFireStoreService } from 'src/app/shared/services/chat-fire-store.service';
import { environment } from 'src/environments/environment';
import { SellerListDC } from '../../interfaces/seller-list-dc';
import { SellerListFilterDC } from '../../interfaces/seller-list-filter-dc';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-search-seller',
  templateUrl: './search-seller.component.html',
  styleUrls: ['./search-seller.component.scss']
})
export class SearchSellerComponent implements OnInit, AfterViewInit {
  @Output() onBack: EventEmitter<void> = new EventEmitter<void>();
  @Output() onSelectUser: EventEmitter<any> = new EventEmitter<any>();
  customInput: Subject<string> = new Subject<string>();
  filter: SellerListFilterDC;
  sellerList: SellerListDC[];
  baseApiUrl: string;
  noItemFound: boolean;
  constructor(public chatService: ChatService
    , public chatAuthService: ChatAuthService
    , public fireStoreService: ChatFireStoreService) {
    this.baseApiUrl = environment.apiBaseUrl;
    this.filter = {
      Keyword: '',
      Skip: 0,
      Take: 10
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.customInput.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(keyword => {
      console.log('value is: ', keyword);
      if (keyword) {
        this.getSellerList();
      }
    });
  }

  onSearch(keyword) {
    this.filter.Skip = 0;
    this.customInput.next(keyword);
  }

  back() {
    this.onBack.emit();
  }

  getSellerList() {
    this.chatService.getSellerList(this.filter).subscribe(x => {

      if (x && x.length > 0) {
        this.sellerList = x;
        this.noItemFound = false;
      } else {
        this.noItemFound = true;
      }
      console.log('seller list is: ', x);
    });
  }

  addUser(seller: SellerListDC) {
    console.log('selected seller is : ', seller);

    this.chatAuthService.login(seller.MobileNumber)
      .then(x => {
        console.log('login successful', x);
        this.onSelectUser.emit({
          email: seller.Name,
          name: seller.Name,
          uid: x.user.uid
        });
      }, error => {
        console.log('error occurs while login', error);
        if (error.code == 'auth/user-not-found') {

          this.chatAuthService.signup(seller.MobileNumber).then(credentials => {
            console.log('credentials: ', credentials);
            this.fireStoreService.createUser(credentials.user.uid, {
              name: seller.Name,
              email: this.chatAuthService.getEmail(seller.MobileNumber),
              uid: credentials.user.uid,
              conversations: []
            }).then(() => {
              this.onSelectUser.emit({
                email: seller.Name,
                name: seller.Name,
                uid: credentials.user.uid
              });
            })
          })
        }
      })

  }

  getNextSeller() {
    this.filter.Skip += this.filter.Take;
    this.getSellerList();
  }

  getPrevSeller() {
    this.filter.Skip -= this.filter.Take;
    this.getSellerList();
  }

}
