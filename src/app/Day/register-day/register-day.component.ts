import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DayDataService } from '../day-data.service';
import { Register } from '../register-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-day',
  templateUrl: './register-day.component.html',
  styleUrls: ['./register-day.component.css']
})
export class RegisterDayComponent implements OnInit {
  public registerForm: FormGroup;
  private url: any;

  constructor(private dayDataService: DayDataService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl()
    })
  }

  onSubmit(){
     let r = new Register(this.registerForm.value.firstName, this.registerForm.value.lastName, this.registerForm.value.email)
     this.dayDataService.registerDay(r).subscribe();
     this.registerForm.reset();
  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
}

}
