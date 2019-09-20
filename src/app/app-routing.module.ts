import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroUserComponent } from './registro-user/registro-user.component';
import { MainComponent } from './main/main.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginGuard } from './login.guard';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileFavsComponent } from './profile-favs/profile-favs.component';


const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', component: MainComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroUserComponent},
  {path: 'search', component: SearchComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [LoginGuard]},
  {path: 'profileEdit', component: ProfileEditComponent, canActivate: [LoginGuard]},
  {path: 'profileFavs', component: ProfileFavsComponent, canActivate: [LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
