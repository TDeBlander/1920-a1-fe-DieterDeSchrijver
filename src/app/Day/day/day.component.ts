import { Component, OnInit, Input } from '@angular/core';
import { Day } from '../day-model';
import { Menu } from 'src/app/Menu/menu-model';
import { Router } from '@angular/router';
import { DayDataService } from '../day-data.service';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {
  @Input() public day: Day;
  private _menu: Menu;
  private _selected: boolean;

  constructor(public router: Router, private dayDataService: DayDataService) { }

  ngOnInit(): void {
  }

  get menu(): Menu{

    return this.day.menu;
  }

  clickDay(){
    if (this.router.url == '/') {
      if (!this._selected) {
        document.getElementById(this.day.id).style.backgroundColor= 'rgba(0,255,0, 0.3)';
        this.dayDataService.selectDay(this.day.id, true);
      }else{
        document.getElementById(this.day.id).style.backgroundColor= 'white';
        this.dayDataService.selectDay(this.day.id, false);
      }
      this._selected = !this._selected;
    }else{
      this.router.navigate(['/day/detail', this.day.id]);
    }
    
  }

}
