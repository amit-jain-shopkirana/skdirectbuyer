import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuyerChatComponent } from './components/buyer-chat/buyer-chat.component';
import { SendMessageComponent } from './components/send-message/send-message.component';


const routes: Routes = [
  {path: 'send/:chatId', component: SendMessageComponent},
  {path: '**', component: BuyerChatComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
