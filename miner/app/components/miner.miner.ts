import {Component} from '@angular/core';
import {Observable} from 'rxjs/Rx';

import { Drawable } from './drawer.drawable';

@Component({
    //data: {  },
   // template: '<div>'
})
export class Miner extends Drawable {
 
 constructor(){
     super(0,0,0,0);
 }


}