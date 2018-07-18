var request = require("request");

describe("test the test request", () => {
    it("tester test", (done) => {
        request.get("http://localhost:3000/test", (error, response, body) => {
            expect(error).toBe(null);
            let data = JSON.parse(body);
            expect(data.test).toEqual(1);
            done();
        });
    })
});

describe("test GET /recipelist", () => {
    it("should return 3 recipelists", (done) => {
        request.get("http://localhost:3000/recipelist", (error, response, body) => {
            expect(error).toBe(null);
            let data = JSON.parse(body);

            //expect(data.recipes.length).toBe(3);

            done();
        });
    })

    it("should contain correct information", (done) => {
        request.get("http://localhost:3000/recipelist", (error, response, body) => {
            expect(error).toBe(null);
            let data = JSON.parse(body);

            //first recipe
            expect(data.recipes[0].recipeName).toBe('chill salad');
            expect(data.recipes[0].estimatedTime).toEqual(0);
            expect(data.recipes[0].id).toEqual(100000);
            expect(data.recipes[0].ingredientList.length).toEqual(3);
            expect(data.recipes[0].ingredientList[0].name).toBe('brocolli');
            expect(data.recipes[0].ingredientList[0].quantity).toEqual(3);
            expect(data.recipes[0].ingredientList[1].name).toBe('celery');
            expect(data.recipes[0].ingredientList[1].quantity).toEqual(1);
            expect(data.recipes[0].ingredientList[2].name).toBe('cabbage');
            expect(data.recipes[0].ingredientList[2].quantity).toEqual(1);
            expect(data.recipes[0].instructionList.length).toEqual(1);
            expect(data.recipes[0].instructionList[0]).toBe('mix ingredients in bowl');

            done();
        });
    })
});

describe("test GET /retrieverecipe:recipename", () => {
    it("should return 'salad' recipe", (done) => {
        request.get("http://localhost:3000/retrieverecipe:salad", (error, response, body) => {
            expect(error).toBe(null);
            let data = JSON.parse(body);

            expect(data.recipe).toBeTruthy();
            expect(data.recipe.recipeName).toBe('salad');
            expect(data.recipe.ingredientList.length).toEqual(5);
            expect(data.recipe.instructionList.length).toEqual(2);

            done();
        });
    })

    it("should return recipe not found error", (done) => {
        request.get("http://localhost:3000/retrieverecipe:not_a_recipe", (error, response, body) => {
            expect(error).toBe(null);
            let data = JSON.parse(body);

            expect(data.error).toBe('recipe not found');

            done();
        });
    })
});

//Returns the recipe you deleted
/*
describe("test GET /deleterecipe:recipename", () => {
    it("should return 1 recipe", (done) => {
        request.get("http://localhost:3000/deleterecipe:fruit%20salad", (error, response, body) => {
            expect(error).toBe(null);
            let data = JSON.parse(body);

            console.log(data);  //for debugging
            console.log(data.recipes);

            expect(data.recipe).toBeTruthy();
            expect(data.recipe.recipeName).toBe('fruit salad');
            //expect(data.recipe.ingredientList.length).toEqual(3);
            //expect(data.recipe.instructionList.length).toEqual(1);

            done();
        });
    })

    it("should return recipe not found error", (done) => {
        request.get("http://localhost:3000/deleterecipe:not_a_recipe", (error, response, body) => {
            let data = JSON.parse(body);

            expect(data.error).toBe('recipe not found');

            done();
        });
    })

    it("should have 2 recipes left", (done) => {
        request.get("http://localhost:3000/recipelist", (error, response, body) => {
        expect(error).toBe(null);
        let data = JSON.parse(body);
        //expect(data.recipes.length).toBe(2);

        done();
        });
    })
});
*/