const num : number = 2;

export class item_ingredient{
    public name : string;
    public quantity : number;
    
    constructor(n : string) {
        this.name = n;
        this.quantity = 0;
    }

    add(){
        this.quantity += 2;
    }
    subtract(){
        this.quantity -= 2;
    }
}