import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

//import { AppComponent }  from './app.component';

import { Timer }  from './components/comp.timer';
import { World }  from './components/miner.world';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ Timer ],
  bootstrap:    [ Timer ]
})
export class AppModule { }