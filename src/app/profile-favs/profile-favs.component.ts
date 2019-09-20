import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../usuarios.service';
import { CancionesService } from '../canciones.service';

@Component({
  selector: 'app-profile-favs',
  templateUrl: './profile-favs.component.html',
  styleUrls: ['./profile-favs.component.css']
})
export class ProfileFavsComponent implements OnInit {
  user: {};
  favs: [];

  constructor(private usuariosService: UsuariosService, private cancionesService: CancionesService) {
    this.user={};
    this.favs=[];
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

      this.cancionesService.getFavs(this.user['id'])
      .then(result=>{
        this.favs=result;
      })
      .catch(err=>{
        console.log(err)
      })
  }

  delFav(idCancion){
    this.cancionesService.delFav(this.user['id'].toString(),idCancion)
    .then(response=>{
      //console.log(response)
    })
    .catch(err=>{
      console.log(err)
    })
    
    this.cancionesService.getFavs(this.user['id'])
    .then(result=>{
      this.favs = result;
      //console.log(this.favs)
    })
    .catch(err=>{
      console.log(err)
    })
  }
}
