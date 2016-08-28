import {Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';

import {Drawable} from './drawer.drawable'

@Component({
    selector: 'drawer',
    templateUrl: `templates/drawer.html`,
})

export class Drawer {

    protected _stats = JSON.parse('{ "stats": []}');  

    protected _size: { H: number, W: number };
    protected _context: CanvasRenderingContext2D;

    public _dataPanel = { h: 10, w: 10, context: CanvasRenderingContext2D };

    private stop = false;

    protected Drawables: Drawable[] = [];

    // private $results = $("#results");
    private _fpsData = { targetFps: 0, fpsInterval: 0, startTime: 0, now: 0, then: 0, elapsed: 0, currentFps: 0, frameCount: 0 };


    // get the element with the #chessCanvas on it
    @ViewChild("drawer") drawerCanvas: ElementRef;

    constructor() {

        this._size = {
            H: 500,
            W: 700,
        }

    }

    ngAfterViewInit() { // wait for the view to init before using the element

        this._context = this.drawerCanvas.nativeElement.getContext("2d");

        this._context.font = "10px Verdana";

        this.startAnimating(30);
        console.log("Drawer Init")
    }

    startAnimating(fps) {
        this._fpsData.targetFps = fps;
        this._fpsData.fpsInterval = 1000 / fps;
        this._fpsData.then = Date.now();
        this._fpsData.startTime = this._fpsData.then;
        this.animate();
    }

    animate() {
        requestAnimationFrame(() => { this.animate() });
        this._fpsData.now = Date.now();
        this._fpsData.elapsed = this._fpsData.now - this._fpsData.then;

        if (this._fpsData.elapsed > this._fpsData.fpsInterval) {
            this._fpsData.then = this._fpsData.now - (this._fpsData.elapsed % this._fpsData.fpsInterval);
            var sinceStart = this._fpsData.now - this._fpsData.startTime;
            this._fpsData.currentFps = Math.round(1000 / (sinceStart / ++this._fpsData.frameCount) * 100) / 100;

           //Clear Frame, perf?
            this._context.clearRect(0, 0, this._size.W, this._size.H);
            
            //stat box
            var s = JSON.parse('{ "stats": []}');//this._stats.stats;
            s.stats.push( JSON.parse('{ "key" : "Fps", "value" : "' + this._fpsData.currentFps + '"}') );
            s.stats.push( JSON.parse('{ "key" : "Frames", "value" : "' + this._fpsData.frameCount + '"}') );

            for(var i = 0, len = s.stats.length; i < len; i++){    
                console.log(i);        
                 this._context.fillText( s.stats[i].key + ":" + s.stats[i].value ,10, 10*i++);                 
            }
            //  drawing code here
          
            this.Drawables.forEach(element => {
    
            });
        }

    }


    get size() {
        return this._size;
    }

    @Input() set size(newValue: { H: number, W: number }) {
        this._size = newValue;
    }


}

interface Stat{ key: any, value: any }