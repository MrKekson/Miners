import {Component, Input, ViewChild, ElementRef} from '@angular/core';

@Component({
    selector: 'drawer',
    template: `<canvas #drawer class='drawer'
     [attr.width]='_size.sizeW'
     [attr.height]='_size.sizeH'></canvas>`,
})
export class Drawer {

    private _size: Object; 

    // get the element with the #chessCanvas on it
    @ViewChild("worldCanvas") worldCanvas: ElementRef; 

    constructor(){
        console.log("drawer" )
        this._size = {
                        sizeH: 80,
                        sizeW: 80,
                        sizeType: "%",
                        }
    }

    ngAfterViewInit() { // wait for the view to init before using the element

      let context: CanvasRenderingContext2D = this.worldCanvas.nativeElement.getContext("2d");
      // happy drawing from here on
      context.fillStyle = 'blue';
      context.fillRect(10, 10, 150, 150);
    }

    get size(){
        return this._size;
    }

    @Input () set size(newValue: Object){
        this._size = newValue;
    }
}