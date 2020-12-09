import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { TopNavigationWrapperComponent } from './components/top-navigation-wrapper/top-navigation-wrapper.component';
import { BottomNavigationWrapperComponent } from './components/bottom-navigation-wrapper/bottom-navigation-wrapper.component';
import { SkDialogComponent } from './components/sk-dialog/sk-dialog.component';
import { NavService } from './services/nav.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { SkAlertComponent } from './components/sk-alert/sk-alert.component';
import {DialogModule} from 'primeng/dialog';
import {BlockUIModule} from 'primeng/blockui';
import {RadioButtonModule} from 'primeng/radiobutton';
import { BuyerProfileComponent } from './components/buyer-profile/buyer-profile.component';
import { ManageAddressComponent } from './components/manage-address/manage-address.component';
import { SkAccordionComponent } from './components/sk-accordion/sk-accordion.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {MenuModule} from 'primeng/menu';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NoItemFoundComponent } from './components/no-item-found/no-item-found.component';
import {PanelMenuModule} from 'primeng/panelmenu';
import { ImageNotFoundComponent } from './components/image-not-found/image-not-found.component';
import { GlobalSearchComponent } from './components/global-search/global-search.component';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    TopNavigationWrapperComponent,
    BottomNavigationWrapperComponent,
    SkDialogComponent,
    SkAlertComponent,
    BuyerProfileComponent,
    ManageAddressComponent,
    SkAccordionComponent,
    ImageUploadComponent,
    NoItemFoundComponent,
    ImageNotFoundComponent,
    GlobalSearchComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    ConfirmDialogModule,
    SidebarModule,
    DialogModule,
    BlockUIModule,
    RadioButtonModule,
    OverlayPanelModule,
    MenuModule,
    AutoCompleteModule,
    InfiniteScrollModule,
    PanelMenuModule
  ],
  exports: [
    NoItemFoundComponent,
    TopNavigationWrapperComponent,
    BottomNavigationWrapperComponent,
    SkDialogComponent,
    SkAlertComponent,
    FormsModule,
    ConfirmDialogModule,
    SidebarModule,
    DialogModule,
    BlockUIModule,
    RadioButtonModule,
    BuyerProfileComponent,
    ManageAddressComponent,
    SkAccordionComponent,
    ImageUploadComponent,
    OverlayPanelModule,
    MenuModule,
    ConfirmDialogComponent,
    AutoCompleteModule,
    InfiniteScrollModule,
    PanelMenuModule,
    ImageNotFoundComponent,
    GlobalSearchComponent
  ],
  providers: [
    NavService,
    ConfirmationService
  ],
  entryComponents: [ConfirmDialogComponent],
})
export class SkDirectSharedModule { }
