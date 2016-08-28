"use strict";
(function (Shape) {
    Shape[Shape["Sphere"] = 0] = "Sphere";
    Shape[Shape["triangle"] = 1] = "triangle";
    Shape[Shape["rect"] = 2] = "rect";
})(exports.Shape || (exports.Shape = {}));
var Shape = exports.Shape;
var Drawable = (function () {
    function Drawable() {
        this.x = 0;
        this.y = 0;
        this.facing = 0; //360
        this.shape = 0;
        this.colour = '#ff0000';
    }
    return Drawable;
}());
exports.Drawable = Drawable;
//# sourceMappingURL=drawer.drawable.js.map