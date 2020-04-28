interface MenuJson{
    title: string;
    id: string;
    description: string;
    allergies: string[];
}

export class Menu{
    constructor(
        private _title: string,
        private _id: string,
        private _description: string,
        private _allergies = new Array<string>(),
    ){}

    static fromJSON(json: MenuJson) : Menu{
        let menu = new Menu(
            json.title,
            json.id,
            json.description,
            json.allergies
        );
        return menu
    }

    
    public get title() : string {
        return this._title; 
    }
    public get description() : string {
        return this._description;
    }
    public get allergies() : string[] {
        return this._allergies; 
    }

    public get id() : string {
        return this._id; 
    }
    
}