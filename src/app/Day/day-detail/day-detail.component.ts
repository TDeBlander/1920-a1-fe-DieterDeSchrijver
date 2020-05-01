import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Day } from '../day-model';
import { User } from 'src/app/User/user-model';
declare var jQuery: any;

@Component({
  selector: 'app-day-detail',
  templateUrl: './day-detail.component.html',
  styleUrls: ['./day-detail.component.css']
})
export class DayDetailComponent implements OnInit {
  private _day: Day;

  constructor(private route: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
    jQuery('.ui.accordion')
  .accordion();

    this.route.data.subscribe(item => 
      this._day = item['day']);

  }

  get registeredUsers(): User[]{
    return this._day.registeredUsers;
  }

  get day(){
    return this._day;
  }

}
