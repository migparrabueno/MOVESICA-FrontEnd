import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../usuarios.service';
import { CancionesService } from '../canciones.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: {};

  constructor(private usuariosService: UsuariosService, private cancionesService: CancionesService) {
    this.user={};
  }

  ngOnInit() {
    this.usuariosService.getUser()
      .then((response)=>{
        this.usuariosService.getUserById(response['userId'])
        .then((response)=>{
          this.user = response;
          //console.log(this.user)
        })
        .catch((err)=>{
          console.log(err)
        })
        
      })
      .catch((err)=>{
        console.log(err)
      })
    
  }

}
