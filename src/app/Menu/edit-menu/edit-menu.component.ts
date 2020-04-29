import {
  Component,
  OnInit
} from '@angular/core';
import {
  Allergy
} from '../allergy-model';
import {
  FormGroup,
  FormControl
} from '@angular/forms';
import {
  MenuDataService
} from '../menu-data.service';
import {
  Menu
} from '../menu-model';
import {
  catchError
} from 'rxjs/operators';
import {
  EMPTY
} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
declare var jQuery: any;

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.css']
})
export class EditMenuComponent implements OnInit {
  private _allergies: Allergy[];
  private _allergiesToAdd: Allergy[];
  private _menu: Menu;


  public menuForm: FormGroup;
  errorMessage: any;

  constructor(private menuDataService: MenuDataService, private route: ActivatedRoute, public router: Router) {}

  ngOnInit(): void {

    this.route.data.subscribe(item => 
      this._menu = item['menu']);

    jQuery('select.dropdown')
      .dropdown();
    

    this.menuForm = new FormGroup({
      title: new FormControl(this._menu.title),
      description: new FormControl(this._menu.description),
      allergies: new FormControl()
    })

    this.menuDataService.allergies$.subscribe(res =>
      this._allergies = res
    )

  }

  get allergies() {
    return this._allergies;
  }

  get menu(){
    return this._menu;
  }

  onSubmit() {
    this._allergiesToAdd = this.menuForm.value.allergies;

    let m = new Menu(this.menuForm.value.title, this.menuForm.value.description, this._allergiesToAdd);
    m.id = this._menu.id

    this.menuDataService
      .updateMenu(m)
      .pipe(
        catchError((err) => {
          this.errorMessage = err;
          return EMPTY;
        })
      )
      .subscribe((menu: Menu) => {
        console.log(`a menu for ${menu.title} was successfully edited`);
      });

    this.router.navigate(['menu/list'])
  }

}
