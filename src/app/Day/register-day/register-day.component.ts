import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  RequiredValidator,
  FormBuilder,
  Validators
} from '@angular/forms';
import {
  DayDataService
} from '../day-data.service';
import {
  Register
} from '../register-model';
import {
  Router
} from '@angular/router';
import {
  tap
} from 'rxjs/operators';
import {
  HttpErrorResponse
} from '@angular/common/http';

@Component({
  selector: 'app-register-day',
  templateUrl: './register-day.component.html',
  styleUrls: ['./register-day.component.css']
})
export class RegisterDayComponent implements OnInit {
  public registerForm: FormGroup;
  private url: any;
  public errorMessage = '';
  public succesMessage = '';

  constructor(private dayDataService: DayDataService, private router: Router, private fb: FormBuilder, ) {}

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
    })
  }

  onSubmit() {
    let r = new Register(this.registerForm.value.firstName, this.registerForm.value.lastName, this.registerForm.value.email)
    if (this.dayDataService.registerDay(r) == undefined) {
      this.succesMessage = '';
      this.errorMessage = 'Please select 1 or more days';
    }else{
      this.dayDataService.registerDay(r).subscribe(
        (val) => {
            this.errorMessage = '';
          this.succesMessage = 'Succesfully registered!'
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          if (err.error instanceof Error) {
            this.errorMessage = `fail`;
          } else {
            this.succesMessage = ''
            this.errorMessage = err.error;
          }
        }
      );
      this.registerForm.reset();
    }
  }
}
