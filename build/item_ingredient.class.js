"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var num = 2;
var item_ingredient = /** @class */ (function () {
    function item_ingredient(n) {
        this.name = n;
        this.quantity = 0;
    }
    item_ingredient.prototype.add = function () {
        this.quantity += 2;
    };
    item_ingredient.prototype.subtract = function () {
        this.quantity -= 2;
    };
    return item_ingredient;
}());
exports.item_ingredient = item_ingredient;
