import {item_ingredient} from "./item_ingredient.class";

export class recipe{
    public ingredientList : item_ingredient[];
    public instructionList : string[];
    public estimatedTime : number;
    public recipeName : string;
    public id: number;

    constructor(recipeName : string, id: number){
        this.ingredientList = [];
        this.instructionList = [];
        this.recipeName = recipeName;
        this.estimatedTime = 0;
        this.id = id;
    }

    addItem(ingr : item_ingredient){
        this.ingredientList.push(ingr);
    }

    addInstruction(inst : string){
        this.instructionList.push(inst);
    }
}