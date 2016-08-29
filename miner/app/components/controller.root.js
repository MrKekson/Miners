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
var miner_timer_1 = require('./miner.timer');
var miner_world_1 = require('./miner.world');
var drawer_drawer_1 = require('./drawer.drawer');
var controller_topbar_1 = require('./controller.topbar');
var RootController = (function () {
    function RootController() {
        console.log("Root.ctor()");
    }
    RootController.prototype.getDrawer = function () {
        return this.drawer;
    };
    RootController = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: './templates/mainView.html',
            directives: [drawer_drawer_1.Drawer, miner_world_1.World, miner_timer_1.Timer, controller_topbar_1.TopBarController]
        }), 
        __metadata('design:paramtypes', [])
    ], RootController);
    return RootController;
}());
exports.RootController = RootController;
//# sourceMappingURL=controller.root.js.map