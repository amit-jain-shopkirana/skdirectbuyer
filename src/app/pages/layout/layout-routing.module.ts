import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from './components/container/container.component';
import { AuthGuard } from 'src/app/shared/auth/auth-guard.service';


const routes: Routes = [
  {
    path: '', component: ContainerComponent, children: [
      { path: 'test', loadChildren: () => import('../../pages/test/test.module').then(m => m.TestModule) },
      { path: 'app-home', loadChildren: () => import('../../pages/app-home/app-home.module').then(m => m.AppHomeModule) },
      { path: 'seller', loadChildren: () => import('../../pages/seller/seller.module').then(m => m.SellerModule) },
      { path: 'cart', loadChildren: () => import('../../pages/cart/cart.module').then(m => m.CartModule) },
      { path: 'my-trade', loadChildren: () => import('../../pages/my-trade/my-trade.module').then(m => m.MyTradeModule), canActivate: [AuthGuard] },
      { path: 'category', loadChildren: () => import('../../pages/category/category.module').then(m => m.CategoryModule) },
      { path: 'buyer-profile', loadChildren: () => import('../../pages/buyer-profile/buyer-profile.module').then(m => m.BuyerProfileModule), canActivate: [AuthGuard] },
      { path: 'item', loadChildren: () => import('../../pages/product/product.module').then(m => m.ProductModule)  },
      { path: 'chat', loadChildren: () => import('../../pages/chat/chat.module').then(m => m.ChatModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
