import {Component} from '@angular/core';
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'header',
    template: 'Ticks (every second) : {{ticks}}'
})
export class Timer {
  ticks =0;
  ngOnInit(){
    let timer = Observable.timer(2000,1000);
    timer.subscribe(t=>this.ticks = t);
  }
}