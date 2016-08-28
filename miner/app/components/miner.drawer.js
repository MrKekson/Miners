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
        this._dataPanel = { h: 10, w: 10, context: CanvasRenderingContext2D };
        this.stop = false;
        // private $results = $("#results");
        this.fpsData = { targetFps: 0, fpsInterval: 0, startTime: 0, now: 0, then: 0, elapsed: 0, currentFps: 0, frameCount: 0 };
        this._size = {
            sizeH: 500,
            sizeW: 700,
        };
    }
    Drawer.prototype.ngAfterViewInit = function () {
        this._dataPanel.context = this.drawerCanvas.nativeElement.getContext("2d");
        this._dataPanel.context.font = "10px Verdana";
        this._dataPanel.context.fillText("Fps: ---", 10, 10);
        /*  this._contexts = [];
          this._contexts.push(this.drawerCanvas.nativeElement.getContext("2d"));
          this._contexts.forEach(element => {
  
              element.fillStyle = 'blue';
              element.fillRect(50, 50, 150, 150);
  
          });*/
        this.startAnimating(30);
        console.log("Drawer Initialized.");
    };
    Drawer.prototype.startAnimating = function (fps) {
        this.fpsData.targetFps = fps;
        this.fpsData.fpsInterval = 1000 / fps;
        this.fpsData.then = Date.now();
        this.fpsData.startTime = this.fpsData.then;
        this.animate();
    };
    Drawer.prototype.animate = function () {
        var _this = this;
        requestAnimationFrame(function () { _this.animate(); });
        this.fpsData.now = Date.now();
        this.fpsData.elapsed = this.fpsData.now - this.fpsData.then;
        if (this.fpsData.elapsed > this.fpsData.fpsInterval) {
            this.fpsData.then = this.fpsData.now - (this.fpsData.elapsed % this.fpsData.fpsInterval);
            var sinceStart = this.fpsData.now - this.fpsData.startTime;
            this.fpsData.currentFps = Math.round(1000 / (sinceStart / ++this.fpsData.frameCount) * 100) / 100;
            // Put your drawing code here
            this._dataPanel.context.clearRect(10, 10, 20, 10);
            this._dataPanel.context.fillText("Fps:" + this.fpsData.currentFps, 10, 10);
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
//# sourceMappingURL=miner.drawer.js.map