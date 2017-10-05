import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

//Pages
import {Page1} from '../pages/page1/page1';
import {LoginPage} from "../pages/login/login";
import {HomePage} from "../pages/home/home";
import {NewsfeedPage} from "../pages/newsfeed/newsfeed"
import {NewsfeedDetailPage} from "../pages/newsfeed-detail/newsfeed-detail"
import {PerfilPage} from "../pages/perfil/perfil";
import {TransfersPage} from "../pages/transfers/transfers";
import {ServicesPage} from "../pages/services/services";

//Modals
import {PasswordRecovery} from "../pages/modals/password-recovery/password-recovery";
import {AccountersModal} from "../pages/modals/accounters-modal/accounters-modal";
import {PasswordChange} from "../pages/modals/password-change/password-change";
import {AccounterModal} from "../pages/modals/accounter-modal/accounter-modal";
import {WidthdrawModal} from "../pages/modals/widthdraw-modal/widthdraw-modal";
import {ServiceModal} from "../pages/modals/service-modal/service-modal";
import {BlockModal} from "../pages/modals/block-modal/block-modal";
import {FilterModal} from "../pages/modals/filter-modal/filter-modal";

//directives
import {Card} from "../pages/directives/card/card";

//Popovers
import {DashboardPopoverPage} from "../pages/popovers/dashboard-popover/dashboard-popover";
import {TransferPopoverPage} from "../pages/popovers/transfer-popover/transfer-popover";

//Services
import {UserService} from "../services/user-service";
import {CatalogService} from "../services/catalog-service";
import {MessageService} from "../services/message-service";

//External dependencies
import {HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import {CryptoModule} from '../../novoCrypto2';
import {CryptoService} from '../../novoCrypto2';
import {NovoHttp} from "../providers/novo-http";
import {Http} from '@angular/http';
import {I18nProvider} from "../providers/i18n";
import {TranslateModule,TranslateService} from "ng2-translate";
import {ToastController} from 'ionic-angular';
import {NovoErrorHandler} from "../errors/error-handler";
import {QRCodeModule} from 'angular2-qrcode';




@NgModule({
  declarations: [
    MyApp,
    Page1,
    LoginPage,
    PerfilPage,
    TransfersPage,
    HomePage,
    PasswordRecovery,
    DashboardPopoverPage,
    TransferPopoverPage,
    ServicesPage,
    NewsfeedPage,
    NewsfeedDetailPage,
    PasswordChange,
    AccountersModal,
    AccounterModal,
    WidthdrawModal,
    ServiceModal,
    BlockModal,
    Card,
    FilterModal
  ],
  imports: [
    IonicModule.forRoot(MyApp),TranslateModule.forRoot(),
    CryptoModule,
    QRCodeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    LoginPage,
    PerfilPage,
    TransfersPage,
    HomePage,
    PasswordRecovery,
    DashboardPopoverPage,
    TransferPopoverPage,
    ServicesPage,
    NewsfeedPage,
    NewsfeedDetailPage,
    PasswordChange,
    AccountersModal,
    AccounterModal,
    WidthdrawModal,
    ServiceModal,
    BlockModal,
    Card,
    FilterModal
  ],
  providers: [

    {provide: ErrorHandler, useFactory: (service: TranslateService,toastCtrl:ToastController)=>{
        return new NovoErrorHandler(service,toastCtrl);
      },deps:[TranslateService,ToastController]
    },
    {provide:CryptoService,useClass:CryptoService},
    {provide:UserService, useClass:UserService},
    {provide:CatalogService, useClass:CatalogService},
    {provide:MessageService, useClass:MessageService},
    {provide:I18nProvider, useClass:I18nProvider},
    {
      provide: NovoHttp,
      useFactory: (backend: XHRBackend, options: RequestOptions) => {
        return new NovoHttp(backend, options);
      },
      deps: [XHRBackend, RequestOptions]
    }
    
    ]})
export class AppModule {}
