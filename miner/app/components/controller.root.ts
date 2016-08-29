import { Component, OnInit } from '@angular/core';

import { Timer }  from './miner.timer';
import { World }  from './miner.world';
import { Drawer }  from './drawer.drawer';
import { TopBarController } from './controller.topbar'

@Component({
  selector: 'my-app',
  templateUrl: './templates/mainView.html',
  directives: [Drawer, World, Timer, TopBarController ]
})

export class RootController { 

      private timer : Timer;
      private world: World;
      private drawer: Drawer;

     constructor() 
     {
  
         console.log("Root.ctor()")
         
     }

     getDrawer(){
       return this.drawer;
     }

}