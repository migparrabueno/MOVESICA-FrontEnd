import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit() {
  }

  onLogOut(){
    //borra el token de localStorage
    localStorage.removeItem('user-token');
  }

}
