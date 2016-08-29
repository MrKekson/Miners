import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AlertComponent, DATEPICKER_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

//import { Routes, RouterModule } from '@angular/router';

import { RootController }  from './components/controller.root';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ RootController ],
  bootstrap:    [ RootController ]
  
})
export class AppModule { }