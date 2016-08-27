import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

//import { AppComponent }  from './app.component';

import { Timer }  from './components/comp.timer';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ Timer ],
  bootstrap:    [ Timer ]
})
export class AppModule { }