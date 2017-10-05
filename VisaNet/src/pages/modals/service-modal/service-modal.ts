import { Component,trigger,state,style,transition,animate,keyframes } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';

/*
  Generated class for the ServiceModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-service-modal',
  templateUrl: 'service-modal.html',
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
export class ServiceModal {
  companies:[any];
  days=[];
  selectedCompany:number=-1;
  selectedDay:number;
  imgSrc:String="";
  periodicPayment:Boolean=false;
  flyInOutState:String="out";
  payment:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {
    this.companies=[
      {
        id:0,
        title:"Movistar",
        imgSrc:"assets/image/movistar.png"
      },
      {
        id:1,
        title:"Entel",
        imgSrc:"assets/image/entel.png"
      },
      {
        id:2,
        title:"Claro",
        imgSrc:"assets/image/claro.png"
      },
      {
        id:3,
        title:"Electroperú",
        imgSrc:"assets/image/electroperu.png"
      },
      {
        id:4,
        title:"Cálidda",
        imgSrc:"assets/image/Calidda.png"
      },
      {
        id:5,
        title:"Sedapal",
        imgSrc:"assets/image/sedapal.png"
      },
     

    ];
    for( var index=1;index<32;index++){
      this.days.unshift(index);
    }

    this.payment={
      company:{},
      description:"",
      associatedNumber:"",
      amount:0
    }

  }

  close(){
     this.viewCtrl.dismiss();
  }

  selectCompany(){
    this.imgSrc=this.companies[this.selectedCompany].imgSrc;
    this.payment.company=this.companies[this.selectedCompany];
  }

  triggerTransition(){
    this.periodicPayment=!this.periodicPayment;
    this.flyInOutState=(this.flyInOutState=="out")?"in":"out";
  }

  makeServicePayment(){
    if(this.periodicPayment){
      this.payment.day=this.selectedDay;
    }
    this.payment.amount=Number(this.payment.amount);
    this.viewCtrl.dismiss(this.payment);
  }

}
