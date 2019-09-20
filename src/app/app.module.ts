import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MapaComponent } from './mapa/mapa.component';
import { FormHomeComponent } from './form-home/form-home.component';
import { LoginComponent } from './login/login.component';
import { RegistroUserComponent } from './registro-user/registro-user.component';
import { MainComponent } from './main/main.component';
import { NavComponent } from './nav/nav.component';
import { SearchComponent } from './search/search.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ListaCancionesComponent } from './lista-canciones/lista-canciones.component';
import { ProfileFavsComponent } from './profile-favs/profile-favs.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MapaComponent,
    FormHomeComponent,
    LoginComponent,
    RegistroUserComponent,
    MainComponent,
    NavComponent,
    SearchComponent,
    SidebarComponent,
    ProfileComponent,
    ProfileEditComponent,
    ListaCancionesComponent,
    ProfileFavsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
