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
        console.log("drawer");
        this._size = {
            sizeH: 80,
            sizeW: 80,
            sizeType: "%",
        };
    }
    Drawer.prototype.ngAfterViewInit = function () {
        var context = this.worldCanvas.nativeElement.getContext("2d");
        // happy drawing from here on
        context.fillStyle = 'blue';
        context.fillRect(10, 10, 150, 150);
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
        core_1.ViewChild("worldCanvas"), 
        __metadata('design:type', core_1.ElementRef)
    ], Drawer.prototype, "worldCanvas", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Drawer.prototype, "size", null);
    Drawer = __decorate([
        core_1.Component({
            selector: 'drawer',
            template: "<canvas #drawer class='drawer'\n     [attr.width]='_size.sizeW'\n     [attr.height]='_size.sizeH'></canvas>",
        }), 
        __metadata('design:paramtypes', [])
    ], Drawer);
    return Drawer;
}());
exports.Drawer = Drawer;
//# sourceMappingURL=miner.drawer.js.map