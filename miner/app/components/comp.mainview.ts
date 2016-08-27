import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: '<h1>Init()</h1>'
})

export class View { 
     constructor() 
     {
         console.log("mainView")
         
     }

}