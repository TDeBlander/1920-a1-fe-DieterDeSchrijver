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

  constructor(private menuDataService: MenuDataService) { }

  ngOnInit(): void {
  }

  deleteMenu(){
    this.menuDataService.deleteMenu(this.menu);
  }

}
