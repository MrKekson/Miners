"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var drawer_drawable_1 = require('./drawer.drawable');
var Drawer = (function () {
    function Drawer() {
        this._stats = [];
        this._dataPanel = { h: 10, w: 10, context: CanvasRenderingContext2D };
        this.stop = false;
        this.Drawables = [];
        // private $results = $("#results");
        this._fpsData = { targetFps: 0, fpsInterval: 0, startTime: 0, now: 0, then: 0, elapsed: 0, currentFps: 0, frameCount: 0 };
        this._size = {
            H: 500,
            W: 1200,
        };
    }
    Drawer.prototype.ngAfterViewInit = function () {
        this._context = this.drawerCanvas.nativeElement.getContext("2d");
        this._context.font = "10px Verdana";
        this._context.lineWidth = 0.3;
        this._context.fillStyle = "#000000";
        //test data, remove
        this.Drawables.push(new drawer_drawable_1.Drawable(50, 100, 0, 1, 1, "#00ff00", "#000000"));
        this.Drawables.push(new drawer_drawable_1.Drawable(50, 200, 10, 2, 1, "#00ff00", "#000000"));
        this.Drawables.push(new drawer_drawable_1.Drawable(50, 300, 20, 5, 1, "#00ff00", "#000000"));
        this.Drawables.push(new drawer_drawable_1.Drawable(50, 400, 30, 10, 1, "#00ff00", "#000000"));
        this.Drawables.push(new drawer_drawable_1.Drawable(150, 100, 0, 1, 2, "#ffff00", "#000000"));
        this.Drawables.push(new drawer_drawable_1.Drawable(150, 200, 0, 2, 2, "#ffff00", "#000000"));
        this.Drawables.push(new drawer_drawable_1.Drawable(150, 300, 0, 5, 2, "#ffff00", "#000000"));
        this.Drawables.push(new drawer_drawable_1.Drawable(150, 400, 0, 10, 2, "#ffff00", "#000000"));
        this.Drawables.push(new drawer_drawable_1.Drawable(250, 100, 0, 1, 2, "#ffff00", "#000000"));
        this.Drawables.push(new drawer_drawable_1.Drawable(250, 200, 10, 2, 2, "#ffff00", "#000000"));
        this.Drawables.push(new drawer_drawable_1.Drawable(250, 300, 20, 5, 2, "#ffff00", "#000000"));
        this.Drawables.push(new drawer_drawable_1.Drawable(250, 400, 30, 10, 2, "#ffff00", "#000000"));
        this.Drawables.push(new drawer_drawable_1.Drawable(330, 100, 0, 1, 0, "#0000ff", "#000000"));
        this.Drawables.push(new drawer_drawable_1.Drawable(330, 200, 0, 2, 0, "#0000ff", "#000000"));
        this.Drawables.push(new drawer_drawable_1.Drawable(330, 300, 0, 5, 0, "#0000ff", "#000000"));
        this.Drawables.push(new drawer_drawable_1.Drawable(330, 400, 0, 10, 0, "#0000ff", "#000000"));
        this.Drawables.push(new drawer_drawable_1.Drawable(500, 100, 0, 1, 1, "#00ff00", "#000000"));
        this.Drawables.push(new drawer_drawable_1.Drawable(500, 200, 0, 2, 1, "#00ff00", "#000000"));
        this.Drawables.push(new drawer_drawable_1.Drawable(500, 300, 0, 5, 1, "#00ff00", "#000000"));
        this.Drawables.push(new drawer_drawable_1.Drawable(500, 400, 0, 10, 1, "#00ff00", "#000000"));
        this.Drawables.push(new drawer_drawable_1.Drawable(600, 100, 0, 1, 2, "#ffff00", "#000000"));
        this.Drawables.push(new drawer_drawable_1.Drawable(600, 200, 0, 2, 2, "#ffff00", "#000000"));
        this.Drawables.push(new drawer_drawable_1.Drawable(600, 300, 0, 5, 2, "#ffff00", "#000000"));
        this.Drawables.push(new drawer_drawable_1.Drawable(600, 400, 0, 10, 2, "#ffff00", "#000000"));
        this.startAnimating(30);
        console.log("Drawer Init");
    };
    Drawer.prototype.startAnimating = function (fps) {
        this._fpsData.targetFps = fps;
        this._fpsData.fpsInterval = 1000 / fps;
        this._fpsData.then = Date.now();
        this._fpsData.startTime = this._fpsData.then;
        this.animate();
    };
    Drawer.prototype.animate = function () {
        var _this = this;
        requestAnimationFrame(function () { _this.animate(); });
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
            for (var _i = 0, _a = this.Drawables; _i < _a.length; _i++) {
                var item = _a[_i];
                this.Renderer1(item);
            }
        }
    };
    //first try
    Drawer.prototype.Renderer1 = function (drw) {
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
                this._context.fillStyle = drw.colour;
                this._context.translate(drw.x + offset, drw.y + offset);
                //this._middle();
                this._context.rotate(drw.facing * Math.PI / 180);
                this._context.fillRect(-size, -size, size, size);
                this._context.strokeRect(-size, -size, size, size);
                break;
            case 2:
                var size = drw.size * 10;
                var offset = size / 2;
                this._context.translate(drw.x + offset, drw.y + offset);
                this._context.rotate(drw.facing * Math.PI / 180);
                //this._middle();
                this._context.beginPath();
                this._context.moveTo(-offset, -offset);
                this._context.lineTo(0, offset);
                this._context.lineTo(-size, offset);
                this._context.closePath();
                this._context.fillStyle = drw.colour;
                this._context.fill();
                break;
            default:
                break;
        }
        this._context.restore();
    };
    Drawer.prototype.DrawGrid = function (gridsize) {
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
    };
    Drawer.prototype._middle = function () {
        this._context.save();
        this._context.arc(0, 0, 0.5, 0, 2 * Math.PI);
        this._context.fillStyle = "#000000";
        this._context.fill();
        this._context.restore();
    };
    ;
    Drawer.prototype.RenderStats = function (render) {
        if (render) {
            //speed?
            var tmparr = this._stats.slice(0);
            tmparr.push(new Stat("Fps", this._fpsData.currentFps));
            tmparr.push(new Stat("Frames", this._fpsData.frameCount));
            tmparr.push(new Stat("Drawables", this.Drawables.length));
            var i = 1;
            for (var _i = 0, tmparr_1 = tmparr; _i < tmparr_1.length; _i++) {
                var item = tmparr_1[_i];
                this._context.fillText(item.key + ":" + item.val, 10, 10 * i++);
            }
        }
    };
    Object.defineProperty(Drawer.prototype, "size", {
        get: function () {
            return this._size;
        },
        set: function (newValue) {
            this._size = newValue;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.ViewChild("drawer"), 
        __metadata('design:type', core_1.ElementRef)
    ], Drawer.prototype, "drawerCanvas", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Drawer.prototype, "size", null);
    Drawer = __decorate([
        core_1.Component({
            selector: 'drawer',
            templateUrl: "templates/drawer.html",
        }), 
        __metadata('design:paramtypes', [])
    ], Drawer);
    return Drawer;
}());
exports.Drawer = Drawer;
var Stat = (function () {
    function Stat(key, val) {
        this.key = key;
        this.val = val;
    }
    return Stat;
}());
//# sourceMappingURL=drawer.drawer.js.map