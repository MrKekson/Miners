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
            W: 700,
        };
    }
    Drawer.prototype.ngAfterViewInit = function () {
        this._context = this.drawerCanvas.nativeElement.getContext("2d");
        this._context.font = "10px Verdana";
        this._context.lineWidth = 2;
        //test data, remove
        this.Drawables.push(new drawer_drawable_1.Drawable(100, 100, 0, 1, 0, "#0000ff", "#000000"));
        this.Drawables.push(new drawer_drawable_1.Drawable(100, 200, 0, 2, 0, "#0000ff", "#000000"));
        this.Drawables.push(new drawer_drawable_1.Drawable(100, 300, 0, 5, 0, "#0000ff", "#000000"));
        this.Drawables.push(new drawer_drawable_1.Drawable(100, 400, 0, 10, 0, "#0000ff", "#000000"));
        this.Drawables.push(new drawer_drawable_1.Drawable(200, 100, 0, 1, 1, "#00ff00", "#404040"));
        this.Drawables.push(new drawer_drawable_1.Drawable(200, 200, 10, 2, 1, "#00ff00", "#404040"));
        this.Drawables.push(new drawer_drawable_1.Drawable(200, 300, 20, 5, 1, "#00ff00", "#404040"));
        this.Drawables.push(new drawer_drawable_1.Drawable(200, 400, 30, 10, 1, "#00ff00", "#404040"));
        this.Drawables.push(new drawer_drawable_1.Drawable(300, 100, 0, 1, 2, "#ffff00", "#202020"));
        this.Drawables.push(new drawer_drawable_1.Drawable(300, 200, 10, 2, 2, "#ffff00", "#202020"));
        this.Drawables.push(new drawer_drawable_1.Drawable(300, 300, 20, 5, 2, "#ffff00", "#202020"));
        this.Drawables.push(new drawer_drawable_1.Drawable(300, 400, 30, 10, 2, "#ffff00", "#202020"));
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
            this.RenderStats(true);
            //stat box
            //  drawing code here
            for (var _i = 0, _a = this.Drawables; _i < _a.length; _i++) {
                var item = _a[_i];
                this.Renderer1(item);
            }
        }
    };
    //first try
    Drawer.prototype.Renderer1 = function (drw) {
        //var filltmp = this._context.fillStyle;
        //var rotate = this._context.rotate;
        this._context.save();
        switch (drw.shape) {
            case 0:
                this._context.beginPath();
                this._context.arc(drw.x, drw.y, drw.size * 5, 0, 2 * Math.PI, false);
                this._context.fillStyle = drw.colour;
                this._context.fill();
                this._context.strokeStyle = drw.borderColour;
                this._context.rotate(drw.facing * Math.PI / 180);
                this._context.stroke();
                break;
            case 1:
                this._context.rotate(drw.facing * Math.PI / 180);
                this._context.fillStyle = drw.colour;
                var size = drw.size * 10;
                var offset = size / 2;
                this._context.fillRect(drw.x - offset, drw.y - offset, size, size);
                this._context.strokeRect(drw.x - offset, drw.y - offset, size, size);
                break;
            case 2:
                var size = drw.size * 10;
                var offset = size / 2;
                this._context.translate(drw.x + offset, drw.y + offset);
                this._context.rotate(drw.facing * Math.PI / 180);
                this._context.beginPath();
                this._context.moveTo(drw.x, drw.y - offset);
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
    };
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