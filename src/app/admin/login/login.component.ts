import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public admin: FormGroup;
  public errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.admin = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })

    $('.message .close')
  .on('click', function() {
    $(this)
      .closest('.message')
      .transition('fade')
    ;
  })
;
  }

  onSubmit(){
    
    this.authService
    .login(this.admin.value.email, this.admin.value.password)
    .subscribe(
      (val) => {
        if (val) {

            this.router.navigate(['']);
          } else {
          this.errorMessage = `Could not login`;
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        if (err.error instanceof Error) {
          this.errorMessage = `Error while trying to login admin ${this.admin.value.email}: ${err.error.message}`;
        } else {
          this.errorMessage = `Error ${err.status} while trying to login admin ${this.admin.value.email}: ${err.error}`;
        }
      }
    );
  }

}
