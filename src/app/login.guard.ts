import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private usuariosService: UsuariosService){

  }
  canActivate(){
    return this.usuariosService.isUserLogged() //devuelve true o false
  }
  
}
