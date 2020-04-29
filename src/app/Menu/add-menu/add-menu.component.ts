import {
  Component,
  OnInit,
  Output
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl
} from '@angular/forms';
import {
  EventEmitter
} from '@angular/core';
import {
  Menu
} from '../menu-model';
import {
  MenuDataService
} from '../menu-data.service';
import {
  Allergy
} from '../allergy-model';
import {
  Observable, EMPTY
} from 'rxjs';
import { catchError } from 'rxjs/operators';
declare var jQuery: any;

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit {
  @Output() public newMenu = new EventEmitter < Menu > ();
  private _allergies: Allergy[];
  private _allergiesToAdd: Allergy[];


  public menuForm: FormGroup;
  errorMessage: any;

  constructor(private menuDataService: MenuDataService) {}

  ngOnInit(): void {


    jQuery('select.dropdown')
      .dropdown();

    this.menuForm = new FormGroup({
      title: new FormControl(),
      description: new FormControl(),
      allergies: new FormControl()
    })

    this.menuDataService.allergies$.subscribe(res =>
      this._allergies = res
    )
  }

  get allergies() {
    return this._allergies;
  }

  onSubmit() {
    this._allergiesToAdd = this.menuForm.value.allergies;
    
    let m = new Menu(this.menuForm.value.title, this.menuForm.value.description, this._allergiesToAdd);
    console.log(m)

    this.menuDataService
      .addMenu(new Menu(this.menuForm.value.title, this.menuForm.value.description, this._allergiesToAdd))
      .pipe(
        catchError((err) => {
          this.errorMessage = err;
          return EMPTY;
        })
      )
      .subscribe((menu: Menu) => {
        console.log(`a menu for ${menu.title} was successfully added`);
      });

      this.menuForm.reset();
  }

}
