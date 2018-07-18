import express = require('express');
import cors = require('cors');
import bodyParser = require('body-parser');
import {recipe} from './recipe.class';
import {item_ingredient} from './item_ingredient.class';

var urlencodedParser = bodyParser.urlencoded({ extended: false });

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'myproject';


let recipeList: Array<recipe> = [];

//create app instance
let app = express();
//port number
const port = process.env.PORT || 3000;

var corsOptions = {
    origin: '*', //Allow all origins
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));
app.use(bodyParser.json()); //Parse json http bodies
let store = "";
app.param('store', function(res,req, next, value){
  (<any> req).data = (<any> req).data || {}; //Js magic, adding a data property
  (<any>req).data.store = value;  //JS magx, store the store
  next(); //Allows for redirection if store doesn't exist or something.
});

//Tester function
app.get("/test",function(req, res){
    res.send('{"test": 1 }');
});

//GET recipelist. no parameters, returns recipe object list in json
app.get("/recipelist",function(req, res){
    res.header("Content-Type","application/json");
    MongoClient.connect(url, function(err : any, client : any) {
        let db = client.db(dbName);
        let recs = db.collection('recipes');
        recs.find().toArray(function(err : any, docs : any) {
            assert.equal(null, err);
            //console.log(docs);
            res.send(docs);
            client.close();
        });
    });
});

//GET retrieve recipelist. recipe name as parameter, returns recipe object in json
app.get("/retrieverecipe:recipename",function(req, res){
    let recipeNameParameter = req.params.recipename;
    recipeNameParameter = recipeNameParameter.substr(1);

    MongoClient.connect(url, function(err : any, client : any) {
        let db = client.db(dbName);
        let recs = db.collection('recipes');
        res.header("Content-Type","application/json");
        //find recipe with recipename as given by parameter
        recs.find({"recipeName":recipeNameParameter}).toArray(function(err : any, rec : any) {
            assert.equal(null, err);

            if(rec == '')   //if response is undefined
                res.send({error : 'recipe not found'});
            else
                res.send(rec);

            client.close();
        });
    });
});
//db.collection.deleteOne()
//GET deletes recipe from parameter name
app.get("/deleterecipe:recipename",function(req, res){
    let recipeNameParameter = req.params.recipename;
    recipeNameParameter = recipeNameParameter.substr(1);

    MongoClient.connect(url, function(err : any, client : any) {
        let db = client.db(dbName);
        let recs = db.collection('recipes');
        res.header("Content-Type","application/json");
        //find recipe with recipename as given by parameter
        recs.find({"recipeName":recipeNameParameter}).toArray(function(err : any, rec : any) {
            assert.equal(null, err);
            if(rec == ''){  //if response is undefined
                res.send({error : 'recipe not found'});
            }
            else{
                res.send(rec);
                recs.deleteOne({"recipeName":recipeNameParameter});
            }
            client.close();
        });
    });
});

//POST adds recipe from object
app.post("/add", urlencodedParser, function(req, res){
    console.log("body",req.body); //should be request body
    recipeList.push(req.body);
    res.header("Content-Type","application/json");
    res.send({error : 'recipe added'});
});

//serve app at the given port
app.listen(port, () => {
    //callback successful
    console.log(`Listening at http://localhost:${port}/`);
});

function populateRecipes(){
    let brocolli = new item_ingredient("brocolli");
    brocolli.quantity = 3;
    let tomato = new item_ingredient("tomato");
    tomato.quantity = 1;
    let onion = new item_ingredient("onion");
    onion.quantity = 1;
    let cabbage = new item_ingredient("cabbage");
    cabbage.quantity = 1;
    let celery = new item_ingredient("celery");
    celery.quantity = 1;
    let honeydew = new item_ingredient("honeydew");
    honeydew.quantity = 1;

    let chillsalad = new recipe('chill salad', 100000);
    chillsalad.addInstruction('mix ingredients in bowl');
    chillsalad.addItem(brocolli);
    chillsalad.addItem(celery);
    chillsalad.addItem(cabbage);
    let salad = new recipe('salad', 100001);
    salad.addInstruction('mix ingredients in bowl');
    salad.addInstruction('add some salad dressing');
    salad.addItem(brocolli);
    salad.addItem(celery);
    salad.addItem(cabbage);
    salad.addItem(tomato);
    salad.addItem(onion);
    let fruitsalad = new recipe('fruit salad', 100002);
    fruitsalad.addInstruction('mix fruits together in bowl');
    fruitsalad.addItem(tomato);
    fruitsalad.addItem(honeydew);

    //convert objects into JSON
    JSON.stringify(chillsalad);
    JSON.stringify(salad);
    JSON.stringify(fruitsalad);

    //Clears the collection. Adds the recipes to the server. Logs all the recipes added in JSON
    MongoClient.connect(url, function(err : any, client : any) {
        assert.equal(null, err);
        console.log("Connected correctly to server. Adding initial recipes");
    
        let db = client.db(dbName);
        let recs = db.collection('recipes');

        //Clear the database. Then insert the recipes
        db.dropDatabase();
        
        recs.insert(chillsalad);
        recs.insert(salad);
        recs.insert(fruitsalad);

        /*check if objects are added correctly
        recs.find().toArray(function(err : any, docs : any) {
            assert.equal(null, err);
            console.log(docs);
            client.close();
        });*/
        console.log("Initial recipes added");
    });
}
populateRecipes();