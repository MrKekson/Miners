"use strict";
(function (Shape) {
    Shape[Shape["Sphere"] = 0] = "Sphere";
    Shape[Shape["Triangle"] = 1] = "Triangle";
    Shape[Shape["Square"] = 2] = "Square";
    Shape[Shape["Pentagon"] = 3] = "Pentagon";
})(exports.Shape || (exports.Shape = {}));
var Shape = exports.Shape;
var Drawable = (function () {
    function Drawable(x, y, facing, size, shape, colour, borderColour, visible) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (facing === void 0) { facing = 0; }
        if (shape === void 0) { shape = 0; }
        if (colour === void 0) { colour = '#ff0000'; }
        if (borderColour === void 0) { borderColour = "#ffffff"; }
        if (visible === void 0) { visible = true; }
        this.x = 0;
        this.y = 0;
        this.facing = 0; //360
        this.shape = 0;
        this.y = y;
        this.x = x;
        this.visible = visible;
        this.size = size;
        this.shape = shape;
        this.facing = facing;
        this.colour = colour;
        this.borderColour = borderColour;
    }
    return Drawable;
}());
exports.Drawable = Drawable;
//# sourceMappingURL=drawer.drawable.js.map