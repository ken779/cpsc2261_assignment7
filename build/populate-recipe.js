"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var item_ingredient_class_1 = require("./item_ingredient.class");
var populaterecipe = /** @class */ (function () {
    function populaterecipe() {
        var brocolli = new item_ingredient_class_1.item_ingredient("brocolli");
        var tomato = new item_ingredient_class_1.item_ingredient("tomato");
        var onion = new item_ingredient_class_1.item_ingredient("onion");
        var cabbage = new item_ingredient_class_1.item_ingredient("cabbage");
        var celery = new item_ingredient_class_1.item_ingredient("celery");
        var honeydew = new item_ingredient_class_1.item_ingredient("honeydew");
    }
    return populaterecipe;
}());
exports.populaterecipe = populaterecipe;
