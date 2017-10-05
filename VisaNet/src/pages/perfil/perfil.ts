import {Component,trigger,state,style,transition,animate,keyframes } from '@angular/core';
import {CatalogService} from "../../services/catalog-service";
import {NavController,Slides,PopoverController,LoadingController } from 'ionic-angular';
import {TransfersPage} from "../transfers/transfers";
import {DashboardPopoverPage} from "../popovers/dashboard-popover/dashboard-popover";
import {TranslateService} from "ng2-translate";
import {UserService} from "../../services/user-service";

/*
  Generated class for the Perfil page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
  animations:[
    trigger('flyInOut',[
      state('in',style({
        transform:'translate3d(0,0,0)'
      })),
      state('out',style({
        transform:'translate3d(150%,0,0)'
      })),
      transition(('in=>out'),animate("200ms ease-in")),
      transition(('out=>in'),animate("200ms ease-out"))
    ])
  ]
})
export class PerfilPage {
  loading:boolean=false;
  notifications:boolean=false;
  notiticationsState:String="out";
  notificationsLabel="";
  letterAvatar="";
  lowBalanceAmount=0;



  userData:any={
    "registro":{
      "user":{
        "primerNombre":"Jose Luis",
        "primerApellido":"Olarte",
        "fechaNacimiento":"13/02/1976",
        "profesion":"Contador publico",
        "email":"jloarte@novopayment.com",
        "telefono":"095-8995532"

      }
    },
    "direccion":{
      "acDir":"Urb Vista Grande Cumbaya",
      "acEstado":"Quito",
      "acPais":"Ecuador"

    }
  };

  constructor(public navCtrl: NavController, private service:UserService,
              private translateService:TranslateService,
              private loadingController: LoadingController,
              private userService:UserService ) {
    
      /*
      this.translateService.get("LABEL_LOADING").subscribe((message)=>{
         
          this.service.getUserData().subscribe(
            (response:any)=>{
              console.log(response);
              this.loading=false;
              this.userData=response;
            },
            (error)=>{
               this.loading=false;
               throw error;
            },
            ()=>{
               this.loading=false;
            }
          );


    });*/
      this.letterAvatar=userService.makeLetterAvatar(this.userData.registro.user.primerNombre+" "+this.userData.registro.user.primerApellido+" s");
      this.lowBalanceAmount=userService.getLowBalanceAmount();
      this.notiticationsState=(this.lowBalanceAmount>0)?"in":"out";

  }


  changeNotifications(){
     this.notiticationsState=(this.notiticationsState=="out")?"in":"out";
   
  }

  save(){
    if(this.notiticationsState=="in"){
      this.userService.setLowBalanceAmount(this.lowBalanceAmount);
    }else{
      this.userService.setLowBalanceAmount(0);
    }
    this.navCtrl.pop();
  }



}
