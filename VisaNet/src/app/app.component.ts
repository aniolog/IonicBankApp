import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen,Keyboard } from 'ionic-native';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { Page3 } from '../pages/page3/page3';
import { Page4 } from '../pages/page4/page4';
import { Page5 } from '../pages/page5/page5';
import {LoginPage} from "../pages/login/login";
import {PerfilPage} from "../pages/perfil/perfil";
import {TranslateService} from "ng2-translate";
import {I18nProvider} from "../providers/i18n";
 



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;


  constructor(public platform: Platform,private i18n:I18nProvider,private translateService:TranslateService) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.backgroundColorByHexString('#005194');
      StatusBar.overlaysWebView(false); 
      Keyboard.hideKeyboardAccessoryBar(true);
      Keyboard.disableScroll(true);
      Splashscreen.hide();

      if(this.platform.is('ios')){
        StatusBar.backgroundColorByHexString("#005194");
        StatusBar.overlaysWebView(false);
      }

      
     
      this.i18n.getOfflineLanguage().subscribe(
                (response)=>{
                   this.setI18nPackage(response);
                },
                (error)=>{
                  console.log(error);
                  alert("no default i18n package");
                }
      );

     
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }


  setI18nPackage(languages:any){
    for (var key in languages){
      this.translateService.setTranslation(key,languages[key]);
    }
    this.translateService.setDefaultLang(navigator.language.split('-')[0]);
    this.translateService.use(/*navigator.language.split('-')[0]*/ "es");



  }
}
