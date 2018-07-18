"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var recipe = /** @class */ (function () {
    function recipe(recipeName, id) {
        this.ingredientList = [];
        this.instructionList = [];
        this.recipeName = recipeName;
        this.estimatedTime = 0;
        this.id = id;
    }
    recipe.prototype.addItem = function (ingr) {
        this.ingredientList.push(ingr);
    };
    recipe.prototype.addInstruction = function (inst) {
        this.instructionList.push(inst);
    };
    return recipe;
}());
exports.recipe = recipe;
