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
            }
        }
    };
    Drawer.prototype.RenderStats = function (render) {
        if (render) {
            //speed?
            var tmparr = this._stats.slice(0);
            var fpsCount = new Stat();
            fpsCount.key = "Fps";
            fpsCount.val = this._fpsData.currentFps;
            tmparr.push(fpsCount);
            var frameCount = new Stat();
            frameCount.key = "Frames";
            frameCount.val = this._fpsData.frameCount;
            tmparr.push(frameCount);
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
    function Stat() {
    }
    return Stat;
}());
//# sourceMappingURL=drawer.drawer.js.map