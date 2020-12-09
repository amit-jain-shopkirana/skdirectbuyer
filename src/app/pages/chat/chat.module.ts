import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { BuyerChatComponent } from './components/buyer-chat/buyer-chat.component';
import { SkDirectSharedModule } from 'src/app/shared/sk-direct-shared.module';
import { SendMessageComponent } from './components/send-message/send-message.component';
import { SearchSellerComponent } from './components/search-seller/search-seller.component';


@NgModule({
  declarations: [BuyerChatComponent, SendMessageComponent, SearchSellerComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    SkDirectSharedModule
  ]
})
export class ChatModule { }
