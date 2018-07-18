//import {item_ingredient} from "./item_ingredient.class";
//import {recipe} from "./recipe.class";
var item_ingredient = require("./item_ingredient.class");
var recipe = require("./recipe.class");

describe("item_ingredient test", function(){
    beforeEach(function() {
    });
    it("should have correct name", function(){
        console.log('classtest');
        let vegetable1 = new item_ingredient("Carrot");
        expect(vegetable1.name).toBe("Carrot");
    });
    it("should have correct default quantity", function(){
        let vegetable1 = new item_ingredient("Carrot");
        expect(vegetable1.quantity).toBe(0);
    });
    it("should add and subtract correctly", function(){
        let vegetable2 = new item_ingredient("Cucumber");
        vegetable2.add();
        vegetable2.add();
        vegetable2.subtract();
        expect(vegetable2.quantity).toBe(2);
    });
})


describe('recipe test', () => {
    let carrot = new item_ingredient("carrot");
    let potato = new item_ingredient("potato");
    let recipe1 = new recipe("recipe 1");

    beforeEach(function() {
    });
    it('should change recipe estimated time',function(){
        recipe1.estimatedTime = 55;
        expect(recipe1.estimatedTime).toBe(55);
    });
    it('should add 2 items to the ingredient list array',function(){
        recipe1.addItem(carrot);
        recipe1.addItem(potato);
        expect(recipe1.ingredientList[0]).toBe(carrot);
        expect(recipe1.ingredientList[1]).toBe(potato);
        expect(recipe1.ingredientList.length).toBe(2);
    });
    it('should add 2 instructions to the instruction list array',function(){
        recipe1.addInstruction("Step 1. make food");
        recipe1.addInstruction("Step 2. make more food");
        expect(recipe1.instructionList[0]).toBe("Step 1. make food");
        expect(recipe1.instructionList[1]).toBe("Step 2. make more food");
        expect(recipe1.instructionList.length).toBe(2);
    });
});
  