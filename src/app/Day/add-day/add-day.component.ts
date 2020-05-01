import { Component, OnInit } from '@angular/core';
import { MenuDataService } from 'src/app/Menu/menu-data.service';
import { Menu } from 'src/app/Menu/menu-model';
import { FormGroup, FormControl } from '@angular/forms';
import { Day } from '../day-model';
import { DayDataService } from '../day-data.service';
import { Router } from '@angular/router';
declare var jQuery: any;

@Component({
  selector: 'app-add-day',
  templateUrl: './add-day.component.html',
  styleUrls: ['./add-day.component.css']
})
export class AddDayComponent implements OnInit {
  private _menus: Menu[];
  public dayForm: FormGroup;
  
  constructor(private menuDataService: MenuDataService, private dayDataService: DayDataService, private router: Router) { }

  ngOnInit(): void {
    jQuery('select.dropdown')
      .dropdown();

    this.dayForm = new FormGroup({
      date: new FormControl(),
      capacity: new FormControl(),
      menu: new FormControl()
    })

    this.menuDataService.allMenus$.subscribe(res =>
      this._menus = res
    )
  }

  get menus() {
    return this._menus;
  }

  onSubmit(){
    let date = new Date(this.dayForm.value.date)
    let day = {
      date: date.toJSON(),
      maxUsers: this.dayForm.value.capacity,
      menu: this.dayForm.value.menu
    }

    this.dayDataService.addDay(day).subscribe((day: Day) => {
      console.log(`a day for ${day.date} was successfully added`);
    });

    this.router.navigate(['day/list'])
  }

}
