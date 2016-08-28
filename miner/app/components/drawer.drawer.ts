import {Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';

@Component({
    selector: 'drawer',
    templateUrl: `templates/drawer.html`,
})
export class Drawer {

    private _size: Object;
    //private _contexts: CanvasRenderingContext2D[];

    public _dataPanel =  { h:10, w:10, context: CanvasRenderingContext2D };

    private stop = false;

    // private $results = $("#results");
    private fpsData = { targetFps: 0, fpsInterval: 0, startTime: 0, now: 0, then: 0, elapsed: 0, currentFps: 0, frameCount: 0 };


    // get the element with the #chessCanvas on it
    @ViewChild("drawer") drawerCanvas: ElementRef;

    constructor() {
       
        this._size = {
            sizeH: 500,
            sizeW: 700,

        }
    }

    ngAfterViewInit() { // wait for the view to init before using the element

        this._dataPanel.context = this.drawerCanvas.nativeElement.getContext("2d");

        this._dataPanel.context.font="10px Verdana";
        this._dataPanel.context.fillText("Fps: ---",10,10);

      

      /*  this._contexts = [];
        this._contexts.push(this.drawerCanvas.nativeElement.getContext("2d"));
        this._contexts.forEach(element => {

            element.fillStyle = 'blue';
            element.fillRect(50, 50, 150, 150);

        });*/

        this.startAnimating(30);
        console.log("Drawer Initialized.")
    }

    startAnimating(fps) {
        this.fpsData.targetFps = fps;
        this.fpsData.fpsInterval = 1000 / fps;
        this.fpsData.then = Date.now();
        this.fpsData.startTime = this.fpsData.then;
        this.animate();
    }

    animate() {

        requestAnimationFrame(() => { this.animate() });
        this.fpsData.now = Date.now();
        this.fpsData.elapsed = this.fpsData.now - this.fpsData.then;

        if (this.fpsData.elapsed > this.fpsData.fpsInterval) {
            this.fpsData.then = this.fpsData.now - (this.fpsData.elapsed % this.fpsData.fpsInterval);
            var sinceStart = this.fpsData.now -  this.fpsData.startTime;
            this.fpsData.currentFps = Math.round(1000 / (sinceStart / ++this.fpsData.frameCount) * 100) / 100;  
            // Put your drawing code here
            
           
            this._dataPanel.context.clearRect(1, 1, 70, 70);
            this._dataPanel.context.fillText("Fps:" + this.fpsData.currentFps,10,10);
           
        }
        
    }


    get size() {
        return this._size;
    }

    @Input() set size(newValue: Object) {
        this._size = newValue;
    }


}