import { Component } from '@angular/core';

import { Timer }  from './miner.timer';
import { World }  from './miner.world';

@Component({
  selector: 'my-app',
  templateUrl: './templates/mainView.html'
})

export class RootController { 
     constructor() 
     {
       
         console.log("rootController")
         
     }

}