import { Component, OnInit } from '@angular/core';

import { Timer }  from './miner.timer';
import { World }  from './miner.world';
import { Drawer }  from './drawer.drawer';

@Component({
  selector: 'my-app',
  templateUrl: './templates/mainView.html',
  directives: [Drawer, World, Timer ]
})

export class RootController { 


      private timer : Timer;
      private world: World;
      private drawer: Drawer;

     constructor() 
     {
  
         console.log("rootController")
         
     }

}