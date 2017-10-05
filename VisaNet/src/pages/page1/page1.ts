import {Component,ViewChild } from '@angular/core';
import {CatalogService} from "../../services/catalog-service";
import {UserService} from "../../services/user-service";
import {NavController,NavParams,Slides,PopoverController,LoadingController,ModalController,ToastController} from 'ionic-angular';
import {PerfilPage} from "../perfil/perfil";
import {DashboardPopoverPage} from "../popovers/dashboard-popover/dashboard-popover";
import {TranslateService} from "ng2-translate";
import {TransferPopoverPage} from "../popovers/transfer-popover/transfer-popover";
import {NewsfeedPage} from "../newsfeed/newsfeed";
import {BlockModal} from "../modals/block-modal/block-modal"
import {FilterModal} from "../modals/filter-modal/filter-modal"
import {BaseComponent} from "../base-component";
import { Events } from 'ionic-angular';


@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 extends BaseComponent {

  cards:any=new Array<any>();
  loading:boolean;
  movements:any=new Array<any>();
  balance:string;
  userCountry:string;
  currentIndex=0;
  isBlocked:boolean=true;
  options:any;

  @ViewChild('mySlider') slider: Slides;
  constructor(public navCtrl: NavController,private service:CatalogService,
  public popoverCtrl: PopoverController,private translateService:TranslateService,
   private loadingController: LoadingController,private userService:UserService,
   private mdlController:ModalController,private navParams:NavParams,myToastCtrl:ToastController,public events: Events){
        
        super(myToastCtrl);
        this.userCountry=this.userService.getUserCountry();

        this.options={
          recent:true,
          type:{
            outcome:true,
            income:true,
            deposit:true,
            transfer:true,
            service:true
          }
        }

        this.events.subscribe('movement:created',()=>{
            this.filterMovements(this.movements);
        });
  }



  ionViewDidLoad() {
    this.cards=[
      {
        noTarjetaConMascara:"4951 71** **** 0056",
        nom_plastico:"José Luis Olarte",
        balance:20874.00+50000.00,
        currency:"USD",
        blocked:true,
        movements:[

              {
                concepto:"Depósito de dinero",
                fecha:new Date(),
                signo:"+",
                monto:20874.00+50000,
                type:0,
                balance:20874.00+50000
              },
              {
                concepto:"Envío de dinero",
                fecha:new Date("7/10/2016"),
                signo:"-",
                monto:59921.00,
                type:1,
                balance:20874.00
              },
              {
                concepto:"Envío de dinero",
                fecha:new Date("6/19/2016"),
                signo:"-",
                monto:65602.00,
                type:1,
                balance:80795.00
              },
               {
                concepto:"Envío de dinero",
                fecha:new Date("5/15/2016"),
                signo:"-",
                monto:49264.00,
                type:1,
                balance:146397.00
              },
               {
                concepto:"Depósito de dinero",
                fecha:new Date("4/1/2015"),
                signo:"+",
                monto:37622.00,
                type:0,
                balance:195661.00
              },
              {
                concepto:"Depósito de dinero",
                fecha:new Date("3/1/2015"),
                signo:"+",
                monto:58039.00,
                type:0,
                balance:158039.00
              },
              {
                concepto:"Depósito de dinero",
                fecha:new Date("1/1/2015"),
                signo:"+",
                monto:100000.00,
                type:0,
                balance:0
              }
        ]
      }

    ];
        this.balance=this.cards[0].balance;
        this.movements=this.cards[0].movements;

    /*
      this.loading=true;
      this.translateService.get("LABEL_LOADING").subscribe((message)=>{
        var loader = this.loadingController.create({
          content: message
        }); 
        loader.present();
        this.service.getCatalog().subscribe(
          (res:any)=>{
            loader.dismiss();
            console.log(res);
            this.cards=res.lista;
            if(this.cards.length>0){
              this.getDetail(this.cards[0].noTarjeta);
            }
          },
          (error)=>{
            loader.dismiss();
            throw error;
          });

      });*/
  }



  nextPage(){ //Metodo para pasar a la siguiente pagina del slide
    this.slider.slideNext();
  }

  prevPage(){ //Metodo para pasar a la  pagina anterior del slide
    this.slider.slidePrev();
  }

  onSlideChanged() {
    this.currentIndex = this.slider.getActiveIndex();
    this.getDetail(this.cards[this.currentIndex].noTarjeta);
    this.balance=this.cards[this.currentIndex].balance;
    this.movements=this.cards[this.currentIndex].movements;
  }

  openPopover(evt:any){
    this.currentIndex = this.slider.getActiveIndex();
    let popover = this.popoverCtrl.create(DashboardPopoverPage,{card:this.cards[this.currentIndex]})
    .present(
        {
          ev: evt
        }
    );
  }

  mySlideOptions={
    pager:true
  };

  goToTrans(evt:any){
     this.currentIndex = this.slider.getActiveIndex();
     this.balance=this.cards[this.currentIndex].balance;
     let transferPopover = this.popoverCtrl.create(TransferPopoverPage,{card:this.cards[this.currentIndex]}).present();
  }

  goToNewsfeed(){
    this.navCtrl.push(NewsfeedPage);
  }



  changeStatus(){
    let blockModal=this.mdlController.create(BlockModal,{status: this.isBlocked,card:this.cards[this.currentIndex]});
    blockModal.onDidDismiss((response)=>{

      if(response){
        this.cards[0].blocked=response.status;
        this.isBlocked=response.status;
      }

    });

    blockModal.present();
    


  }

   openFilterModal(){
     let self=this;
      let filterModal=this.mdlController.create(FilterModal,{options:this.options});
      filterModal.onDidDismiss(()=>{
        self.filterMovements(this.movements);


      });

      filterModal.present();
    


  }


  filterMovements(options:any){

    let myFilteredList:Array<any>=[];
    let limit=0;
    var dateTo,dateFrom;
    

    if((this.cards[0].movements.lenght>9)&&(this.options.recent)){
    limit = 10;
    }else{
      limit = this.cards[0].movements.length;
      dateTo=new Date(this.options.to);
      dateFrom=new Date(this.options.from);
    }

    for (var index=0 ;index<limit ;index++){
      var movement = this.cards[0].movements[index];

      if  ((this.options.recent) || ( (!this.options.recent) && (dateTo>=movement.fecha) && (dateFrom<movement.fecha))) {
          
          if ( 
              ((this.options.type.deposit) && (movement.type==0)) || 
              ((this.options.type.income) && (movement.type==1))  || 
              ((this.options.type.outcome) && (movement.type==2)) ||
              ((this.options.type.service) && (movement.type==3)) ||
              ((this.options.type.transfer) && (movement.type==4)) 
              ){
                myFilteredList.push(movement);
              } 

      }

    }
    this.movements=myFilteredList;

  }




  getDetail(cardNumber:string){
    /*
    this.balance="";
    this.loading=true;
    this.movements=[];
    this.service.getDetail(cardNumber).subscribe(
      (res:any)=>{
        this.movements=res.movimientos;
        this.service.getBalance(cardNumber).subscribe(
          (res:any)=>{
            console.log(res);
            this.balance="$ "+res.disponible;
            this.loading=false;
          },
          (err)=>{
            this.balance="-";
            this.loading=false;
            throw err;
          }
        );
      },
      (err)=>{
          this.balance="-";
          this.loading=false;
          throw err;
      });
  */
  }


  



}
