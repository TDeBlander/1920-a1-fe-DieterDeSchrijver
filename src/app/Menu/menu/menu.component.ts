import { Component, OnInit, Input } from '@angular/core';
import { Menu } from '../menu-model';
import { MenuDataService } from '../menu-data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input() public menu: Menu;
  @Input() public inDay: boolean;
  @Input() public date: Date;

  constructor(private menuDataService: MenuDataService) { }

  ngOnInit(): void {
    console.log(this.inDay)
    console.log(this.date)
  }

  get allergies(){
    return this.menu.allergies
  }

  deleteMenu(){
    this.menuDataService.deleteMenu(this.menu);
  }

}
