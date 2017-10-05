import { Component,Input, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import {Observable} from 'rxjs/Rx';

import { UserService } from "../../../services/user-service";

/*
  Generated class for the Card page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'card',
  templateUrl: 'card.html',
  animations: [
  trigger('fade', [
    state('visible', style({
      opacity: 1
    })),
    state('invisible', style({
      opacity: 0.1
    })),
    transition('visible <=> invisible', animate('1000ms linear'))
  ])


  ]
})
export class Card {

  @Input() private card:any;
  fadeState: String = 'visible';
  interval:any;

  
  constructor(private userService:UserService) {
    this.card=this.card||{};   
    let newobs = Observable.interval(1000).map(()=>{

        this.fadeState = (this.fadeState == 'visible') ? 'invisible' : 'visible';  
    });
    let newsub = newobs.subscribe();
  }

  checkLowBalance(){
    return(this.card.balance<=this.userService.getLowBalanceAmount());
  }




}
