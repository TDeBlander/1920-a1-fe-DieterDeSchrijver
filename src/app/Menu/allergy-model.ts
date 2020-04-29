interface AllergyJson{
    name: string;
    id: string;
    iconName: string;
}

interface AllergyForBackend{
    id: string
}

export class Allergy{
    private _id: string;

    constructor(
        private _name: string,
        private _iconName: string,
    ){}

    static fromJSON(json: AllergyJson) : Allergy{
        let menu = new Allergy(
            json.name,
            json.iconName,
        );

        menu.id = json.id;
        return menu
    }

    
    public get name() : string {
        return this._name; 
    }
    public get iconName() : string {
        return this._iconName;
    }

    public get id() : string {
        return this._id; 
    }
    
    public set id(v : string) {
        this._id = v;
    }
    
    
}