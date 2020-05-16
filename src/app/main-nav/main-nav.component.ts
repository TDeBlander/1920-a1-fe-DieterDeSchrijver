import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../admin/authentication.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {
  }

  get isAdmin() : boolean{
    return this.auth.admin$.value != null;
  }

  logout(){
    this.auth.logout();
  }

}
