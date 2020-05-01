import { Component, OnInit, Input } from '@angular/core';
import { Day } from '../day-model';
import { Menu } from 'src/app/Menu/menu-model';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {
  @Input() public day: Day;
  private _menu: Menu;

  constructor() { }

  ngOnInit(): void {
  }

  get menu(): Menu{

    return this.day.menu;
  }

}
