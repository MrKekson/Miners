import {Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';

import {Drawable} from './drawer.drawable'

@Component({
    selector: 'drawer',
    templateUrl: `templates/drawer.html`,
})

export class Drawer {

    protected _stats: Stat[] = [];

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
        this._context.lineWidth = 2;

        //test data, remove
        
        this.Drawables.push(new Drawable(100, 100, 0, 1, 0,"#0000ff", "#000000") );
        this.Drawables.push(new Drawable(100, 200, 0, 2, 0, "#0000ff", "#000000"));
        this.Drawables.push(new Drawable(100, 300, 0, 5, 0, "#0000ff", "#000000"));
        this.Drawables.push(new Drawable(100, 400, 0, 10, 0, "#0000ff", "#000000"));

        this.Drawables.push(new Drawable(200, 100, 0, 1, 1,"#00ff00", "#404040") );
        this.Drawables.push(new Drawable(200, 200, 10, 2, 1,"#00ff00", "#404040") );
        this.Drawables.push(new Drawable(200, 300, 20, 5, 1, "#00ff00", "#404040"));
        this.Drawables.push(new Drawable(200, 400, 30, 10, 1, "#00ff00", "#404040"));

        this.Drawables.push(new Drawable(300, 100, 0, 1, 2,"#ffff00", "#202020") );
        this.Drawables.push(new Drawable(300, 200, 10, 2, 2,"#ffff00", "#202020") );
        this.Drawables.push(new Drawable(300, 300, 20, 5, 2, "#ffff00", "#202020"));
        this.Drawables.push(new Drawable(300, 400, 30, 10, 2, "#ffff00", "#202020"));

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
            this.RenderStats(true);
            //stat box

            //  drawing code here

            for (var item of this.Drawables) {
                    this.Renderer1(item);


            }
        }

    }

    //first try
    private Renderer1( drw:Drawable ){

           //var filltmp = this._context.fillStyle;
           //var rotate = this._context.rotate;
           this._context.save();

           switch (drw.shape) {
               case 0:
                        this._context.beginPath();
                        this._context.arc(drw.x, drw.y, drw.size*5, 0, 2 * Math.PI, false);
                        this._context.fillStyle = drw.colour;
                        this._context.fill();
                        this._context.strokeStyle = drw.borderColour;
                        this._context.rotate(drw.facing*Math.PI/180);
                        this._context.stroke();
                   break;
                case 1: 
                        this._context.rotate(drw.facing*Math.PI/180);
                        this._context.fillStyle = drw.colour;
                        var size = drw.size*10;
                        var offset = size/2;
                        this._context.fillRect(drw.x-offset, drw.y-offset, size, size);
                        this._context.strokeRect(drw.x-offset, drw.y-offset, size, size);
                        
                    break;
                case 2:

                        var size = drw.size*10;
                        var offset = size/2;

                        this._context.translate(drw.x+offset, drw.y+offset);
                        this._context.rotate(drw.facing*Math.PI/180);
                        this._context.beginPath();
                        this._context.moveTo(drw.x, drw.y-offset);
                        this._context.lineTo(drw.x + size / 2, drw.y + offset);
                        this._context.lineTo(drw.x - size / 2, drw.y + offset);
                        this._context.closePath();
                        this._context.fillStyle = drw.colour;
                        this._context.fill();
                    break;

               default:
                   break;
           } 
           this._context.restore();
        //    this._context.setTransform(1, 0, 0, 1, 0, 0);
        //    this._context.fillStyle = filltmp; 
           //this._context.rotate(-rotate);

    }

    private RenderStats(render: Boolean) {
        if (render) {
            //speed?
            var tmparr = this._stats.slice(0);
         
            tmparr.push(new Stat("Fps", this._fpsData.currentFps));
            tmparr.push(new Stat("Frames", this._fpsData.frameCount));
            tmparr.push(new Stat("Drawables", this.Drawables.length));

            var i = 1;
            for (var item of tmparr) {
                this._context.fillText(item.key + ":" + item.val, 10, 10 * i++);
            }
        }
    }


    get size() {
        return this._size;
    }

    @Input() set size(newValue: { H: number, W: number }) {
        this._size = newValue;
    }


}

class Stat { key: any; val: any; constructor( key: string, val:any  ) { this.key = key; this.val = val; } }