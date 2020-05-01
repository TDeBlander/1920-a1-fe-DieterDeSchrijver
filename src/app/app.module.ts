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

const appRoutes: Routes = [
  {path: 'menu/list', component: MenuListComponent},
  {path: 'menu/edit', component: EditMenuComponent},
  {path: 'day/list', component: DayListComponent},
  { path: 'menu/edit/:id', component: EditMenuComponent,
    resolve: { menu: MenuResolver}},
  { path: '**', component: PageNotFoundComponent}
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
    DayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
