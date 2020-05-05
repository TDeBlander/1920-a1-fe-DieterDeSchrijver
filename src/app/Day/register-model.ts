export class Register{
    private _dayIds: string[]

    constructor(
        private _firstName: string,
        private _lastName: string,
        private _email: string,
    ){
    }

    public toJSON(){
        return {
            firstName: this._firstName,
            lastName: this._lastName,
            email: this._email,
            dayIds: this._dayIds
        }
    }

    
    public get firstName() : string {
        return this._firstName;
    }

    public get lastName() : string {
        return this._lastName;
    }

    public get email() : string {
        return this._email;
    }

    public get dayIds() : string[] {
        return this._dayIds;
    }

    public set dayIds(d : string[]) {
        this._dayIds = d;
    }
    
}