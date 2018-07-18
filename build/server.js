"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var recipe_class_1 = require("./recipe.class");
var item_ingredient_class_1 = require("./item_ingredient.class");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
// Connection URL
var url = 'mongodb://localhost:27017';
// Database Name
var dbName = 'myproject';
var recipeList = [];
//create app instance
var app = express();
//port number
var port = process.env.PORT || 3000;
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(bodyParser.json()); //Parse json http bodies
var store = "";
app.param('store', function (res, req, next, value) {
    req.data = req.data || {}; //Js magic, adding a data property
    req.data.store = value; //JS magx, store the store
    next(); //Allows for redirection if store doesn't exist or something.
});
//Tester function
app.get("/test", function (req, res) {
    res.send('{"test": 1 }');
});
//GET recipelist. no parameters, returns recipe object list in json
app.get("/recipelist", function (req, res) {
    res.header("Content-Type", "application/json");
    MongoClient.connect(url, function (err, client) {
        var db = client.db(dbName);
        var recs = db.collection('recipes');
        recs.find().toArray(function (err, docs) {
            assert.equal(null, err);
            //console.log(docs);
            res.send(docs);
            client.close();
        });
    });
});
//GET retrieve recipelist. recipe name as parameter, returns recipe object in json
app.get("/retrieverecipe:recipename", function (req, res) {
    var recipeNameParameter = req.params.recipename;
    recipeNameParameter = recipeNameParameter.substr(1);
    MongoClient.connect(url, function (err, client) {
        var db = client.db(dbName);
        var recs = db.collection('recipes');
        res.header("Content-Type", "application/json");
        //find recipe with recipename as given by parameter
        recs.find({ "recipeName": recipeNameParameter }).toArray(function (err, rec) {
            assert.equal(null, err);
            if (rec == '') //if response is undefined
                res.send({ error: 'recipe not found' });
            else
                res.send(rec);
            client.close();
        });
    });
});
//db.collection.deleteOne()
//GET deletes recipe from parameter name
app.get("/deleterecipe:recipename", function (req, res) {
    var recipeNameParameter = req.params.recipename;
    recipeNameParameter = recipeNameParameter.substr(1);
    MongoClient.connect(url, function (err, client) {
        var db = client.db(dbName);
        var recs = db.collection('recipes');
        res.header("Content-Type", "application/json");
        //find recipe with recipename as given by parameter
        recs.find({ "recipeName": recipeNameParameter }).toArray(function (err, rec) {
            assert.equal(null, err);
            if (rec == '') { //if response is undefined
                res.send({ error: 'recipe not found' });
            }
            else {
                res.send(rec);
                recs.deleteOne({ "recipeName": recipeNameParameter });
            }
            client.close();
        });
    });
});
//POST adds recipe from object
app.post("/add", urlencodedParser, function (req, res) {
    console.log("body", req.body); //should be request body
    recipeList.push(req.body);
    res.header("Content-Type", "application/json");
    res.send({ error: 'recipe added' });
});
//serve app at the given port
app.listen(port, function () {
    //callback successful
    console.log("Listening at http://localhost:" + port + "/");
});
function populateRecipes() {
    var brocolli = new item_ingredient_class_1.item_ingredient("brocolli");
    brocolli.quantity = 3;
    var tomato = new item_ingredient_class_1.item_ingredient("tomato");
    tomato.quantity = 1;
    var onion = new item_ingredient_class_1.item_ingredient("onion");
    onion.quantity = 1;
    var cabbage = new item_ingredient_class_1.item_ingredient("cabbage");
    cabbage.quantity = 1;
    var celery = new item_ingredient_class_1.item_ingredient("celery");
    celery.quantity = 1;
    var honeydew = new item_ingredient_class_1.item_ingredient("honeydew");
    honeydew.quantity = 1;
    var chillsalad = new recipe_class_1.recipe('chill salad', 100000);
    chillsalad.addInstruction('mix ingredients in bowl');
    chillsalad.addItem(brocolli);
    chillsalad.addItem(celery);
    chillsalad.addItem(cabbage);
    var salad = new recipe_class_1.recipe('salad', 100001);
    salad.addInstruction('mix ingredients in bowl');
    salad.addInstruction('add some salad dressing');
    salad.addItem(brocolli);
    salad.addItem(celery);
    salad.addItem(cabbage);
    salad.addItem(tomato);
    salad.addItem(onion);
    var fruitsalad = new recipe_class_1.recipe('fruit salad', 100002);
    fruitsalad.addInstruction('mix fruits together in bowl');
    fruitsalad.addItem(tomato);
    fruitsalad.addItem(honeydew);
    //convert objects into JSON
    JSON.stringify(chillsalad);
    JSON.stringify(salad);
    JSON.stringify(fruitsalad);
    //Clears the collection. Adds the recipes to the server. Logs all the recipes added in JSON
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected correctly to server. Adding initial recipes");
        var db = client.db(dbName);
        var recs = db.collection('recipes');
        //Clear the database. Then insert the recipes
        db.dropDatabase();
        recs.insert(chillsalad);
        recs.insert(salad);
        recs.insert(fruitsalad);
        //check if objects are added correctly
        recs.find().toArray(function (err, docs) {
            assert.equal(null, err);
            console.log(docs);
            client.close();
        });
        console.log("Initial recipes added");
    });
}
populateRecipes();
