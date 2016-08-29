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
            H: 600,
            W: 1200,
        }

    }

    ngAfterViewInit() { // wait for the view to init before using the element

        this._context = this.drawerCanvas.nativeElement.getContext("2d");

        this._context.font = "10px Verdana";
        this._context.lineWidth = 0.3;
        this._context.fillStyle = "#000000";

        //test data, remove

        this.Drawables.push(new Drawable(50, 100, 0, 1, 1, "#00ff00", "#000000"));
        this.Drawables.push(new Drawable(50, 200, 0, 2, 1, "#00ff00", "#000000"));
        this.Drawables.push(new Drawable(50, 300, 0, 5, 1, "#00ff00", "#000000"));
        this.Drawables.push(new Drawable(50, 400, 0, 10, 1, "#00ff00", "#000000"));

        this.Drawables.push(new Drawable(150, 100, 0, 1, 2, "#ffff00", "#000000"));
        this.Drawables.push(new Drawable(150, 200, 0, 2, 2, "#ffff00", "#000000"));
        this.Drawables.push(new Drawable(150, 300, 0, 5, 2, "#ffff00", "#000000"));
        this.Drawables.push(new Drawable(150, 400, 0, 10, 2, "#ffff00", "#000000"));

        this.Drawables.push(new Drawable(250, 100, 0, 1, 2, "#ffff00", "#000000"));
        this.Drawables.push(new Drawable(250, 200, 10, 2, 2, "#ffff00", "#000000"));
        this.Drawables.push(new Drawable(250, 300, 20, 5, 2, "#ffff00", "#000000"));
        this.Drawables.push(new Drawable(250, 400, 30, 10, 2, "#ffff00", "#000000"));

        this.Drawables.push(new Drawable(350, 100, 0, 1, 0, "#0000ff", "#000000"));
        this.Drawables.push(new Drawable(350, 200, 0, 2, 0, "#0000ff", "#000000"));
        this.Drawables.push(new Drawable(350, 300, 0, 5, 0, "#0000ff", "#000000"));
        this.Drawables.push(new Drawable(350, 400, 0, 10, 0, "#0000ff", "#000000"));

        this.Drawables.push(new Drawable(500, 100, 0, 1, 1, "#00ff00", "#000000"));
        this.Drawables.push(new Drawable(500, 200, 0, 2, 1, "#00ff00", "#000000"));
        this.Drawables.push(new Drawable(500, 300, 0, 5, 1, "#00ff00", "#000000"));
        this.Drawables.push(new Drawable(500, 400, 0, 10, 1, "#00ff00", "#000000"));

        this.Drawables.push(new Drawable(600, 100, 0, 1, 2, "#ffff00", "#000000"));
        this.Drawables.push(new Drawable(600, 200, 0, 2, 2, "#ffff00", "#000000"));
        this.Drawables.push(new Drawable(600, 300, 0, 5, 2, "#ffff00", "#000000"));
        this.Drawables.push(new Drawable(600, 400, 0, 10, 2, "#ffff00", "#000000"));

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


            //things

            this.RenderStats(true);
            this.DrawGrid(50);

            //  drawing code here


            for (var item of this.Drawables) {
                this.Renderer1(item);
            }
        }

    }

    //first try
    private Renderer1(drw: Drawable) {
        drw.facing >= 360 ? drw.facing = 0 : drw.x > 300 ? drw.facing += 3 : null;

        this._context.save();

        switch (drw.shape) {
            case 0:
                var size = drw.size * 5;
                var offset = size / 2;

                this._context.translate(drw.x + offset, drw.y + offset);
                //this._middle();
                //this._context.rotate(drw.facing*Math.PI/180); //hehe

                this._context.beginPath();
                this._context.arc(-offset, -offset, size, 0, 2 * Math.PI);
                this._context.fillStyle = drw.colour;
                this._context.fill();
                this._context.strokeStyle = drw.borderColour;
                this._context.stroke();
                break;
            case 1:
                var size = drw.size * 10;
                var offset = size / 2;
                this._context.translate(drw.x, drw.y);
                this._context.rotate(drw.facing * Math.PI / 180);
                

                this._context.beginPath();
                this._context.moveTo(0, -offset*0.9);
                this._context.lineTo(offset, offset*0.6);
                this._context.lineTo(-offset, offset*0.6);
                this._context.closePath();
                this._context.fillStyle = drw.colour;
                this._context.fill();
                
                this.RenderMiddle();

                break;
            case 2:
                var size = drw.size * 10;
                var offset = size / 2;

                this._context.fillStyle = drw.colour;

                this._context.translate(drw.x , drw.y );
              
                this._context.rotate(drw.facing * Math.PI / 180);

                this._context.fillRect(-offset, -offset, size, size);
                this._context.strokeRect(-offset, -offset, size, size);
                
                this.RenderMiddle();  

                break;

            default:
                break;
        }
        this._context.restore();
    }


    private DrawGrid(gridsize: number) {
        this._context.save();
        this._context.setTransform(1, 0, 0, 1, 0, 0);
        this._context.lineWidth = 0.3;
        this._context.fillStyle = "#000000";

        for (var index = 0; index < this._size.H; index += gridsize) {
            this._context.beginPath();
            this._context.moveTo(0, index);
            this._context.lineTo(this._size.W, index);
            this._context.stroke();
        }

        for (var index = 0; index < this._size.W; index += gridsize) {
            this._context.beginPath();
            this._context.moveTo(index, 0);
            this._context.lineTo(index, this._size.H);
            this._context.stroke();
        }
        this._context.restore();
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

    private RenderMiddle(){
                this._context.beginPath();
                this._context.lineWidth = 2;
                this._context.arc(0, 0, 2, 0, 2 * Math.PI);
                this._context.stroke();
    }

    get size() {
        return this._size;
    }

    @Input() set size(newValue: { H: number, W: number }) {
        this._size = newValue;
    }


}

class Stat { key: any; val: any; constructor(key: string, val: any) { this.key = key; this.val = val; } }