import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'topbar',
    templateUrl: `templates/timer.html`,
})

export class Timer {
 
  ticks = 0;

  ngOnInit(){

    console.log("TimerInit");
    let timer = Observable.timer(2000,1000);
    timer.subscribe(t=>this.ticks = t);

  // const HeartBeat = Observable.bindCallback( this.tick );
    
   //HeartBeat.subscribe 
  }

  tick( t ){


    console.log("faff");

  }





}