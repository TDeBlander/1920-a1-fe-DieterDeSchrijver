import { Menu } from '../Menu/menu-model';
import { User } from '../User/user-model';

interface DayJson{
    id: string;
    date: string;
    maxUsers: number;
    registeredUsers: User[];
    menu: Menu;
}

export class Day{

    constructor(
        private _id: string,
        private _date: Date,
        private _maxUsers: number,
        private _registeredUsers: User[],
        private _menu: Menu
    ){
    }

    static fromJSON(json: DayJson): Day {
        let day = new Day(
            json.id,
          new Date(json.date),
          json.maxUsers,
          json.registeredUsers,
          json.menu
        );
        return day
      }

      public get id(): string {
        return this._id;
      }

      public get date(): Date {
        return this._date;
      }

      public get maxUsers(): number {
        return this._maxUsers;
      }

      public get registeredUsers(): User[] {
        return this._registeredUsers;
      }

      public get menu(): Menu {
        return this._menu;
      }
}