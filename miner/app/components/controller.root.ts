import { Component } from '@angular/core';

import { Timer }  from './miner.timer';
import { World }  from './miner.world';
import { Drawer }  from './miner.drawer';

@Component({
  selector: 'my-app',
  templateUrl: './templates/mainView.html'
})

export class RootController { 

      private timer : Timer;
      private world: World;
      private drawer: Drawer;

     constructor() 
     {
       this.timer = new Timer();
       this.drawer = new Drawer();


         console.log("rootController")
         
     }

}