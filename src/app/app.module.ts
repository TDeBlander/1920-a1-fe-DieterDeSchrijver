import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './Menu/menu/menu.component';
import { MenuListComponent } from './Menu/menu-list/menu-list.component';
import { AddMenuComponent } from './Menu/add-menu/add-menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EditMenuComponent } from './Menu/edit-menu/edit-menu.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { MenuResolver } from './Menu/MenuResolver';
import { DayListComponent } from './Day/day-list/day-list.component';
import { DayComponent } from './Day/day/day.component';
import { DayDetailComponent } from './Day/day-detail/day-detail.component';
import { DayResolver } from './Day/DayResolver';
import { AddDayComponent } from './Day/add-day/add-day.component';
import { HomeComponent } from './Home/home/home.component';
import { RegisterDayComponent } from './Day/register-day/register-day.component';
import { AdminModule } from './admin/admin.module';
import { LoginComponent } from './admin/login/login.component';
import { httpInterceptorProviders } from './http-interceptors';
import { AuthGuard } from './admin/auth.guard';

const appRoutes: Routes = [
  {path: 'menu/list',canActivate: [ AuthGuard ], component: MenuListComponent, },
  {path: 'day/add',canActivate: [ AuthGuard ], component: AddDayComponent},
  {path: 'menu/edit',canActivate: [ AuthGuard ], component: EditMenuComponent},
  {path: 'day/list',canActivate: [ AuthGuard ], component: DayListComponent},
  { path: 'auth/login', component: LoginComponent},
  {path: 'day/detail/:id',canActivate: [ AuthGuard ], component: DayDetailComponent,
    resolve: {day: DayResolver}},
  { path: 'menu/edit/:id',canActivate: [ AuthGuard ], component: EditMenuComponent,
    resolve: { menu: MenuResolver}},
    {path: '', component: HomeComponent},
  { path: '**', component: PageNotFoundComponent},
  
];


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MenuListComponent,
    AddMenuComponent,
    EditMenuComponent,
    MainNavComponent,
    DayListComponent,
    DayComponent,
    DayDetailComponent,
    AddDayComponent,
    HomeComponent,
    RegisterDayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AdminModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
