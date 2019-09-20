import { Component, OnInit, Input } from '@angular/core';
import { CancionesService } from '../canciones.service';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-lista-canciones',
  templateUrl: './lista-canciones.component.html',
  styleUrls: ['./lista-canciones.component.css']
})
export class ListaCancionesComponent implements OnInit {
  @Input() canciones: any[];
  currentPage: number;
  numPages: number;
  @Input() estado: boolean;
  estadoFinal: boolean;
  logued: boolean;
  user: {};
  favs: [];
  mifav: boolean;
  
  constructor(private cancionesService: CancionesService, private usuariosService: UsuariosService) {
    this.canciones = [];
    this.currentPage = 0;
    this.numPages = 0;
    this.estadoFinal = this.estado;
    this.logued = false;
    this.user={};
    this.favs=[];
    this.mifav = false;
   }

  ngOnInit() {
    
    this.cancionesService.getAll(this.currentPage)
    .then(response=>{
      this.canciones = response;
    })
    .catch(err=>{
      console.log(err)
    })   
    
    this.cancionesService.getAlll()
    .then(response=>{
      this.numPages = Math.floor(response.length/10)
      //console.log(this.numPages)
    })
    .catch(err=>{
      console.log(err)
    })
    
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
    
    this.logued = this.usuariosService.isUserLogged();

    this.cancionesService.getFavs(this.user['id'])
    .then(result=>{
      this.favs = result;
      //console.log(this.favs)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  onCambiarPag(action){
    if(action == 'prev' && this.currentPage!=0){
      this.currentPage --;
    }else if(action =='next'){
      this.currentPage ++;
    }

    this.cancionesService.getAll(this.currentPage)
    .then(response=>{
      this.canciones = response;
    })
    .catch(err=>{
      console.log(err)
    })    
  }

  ngOnChanges(){
    this.estadoFinal = this.estado;
  }
  
  reiniciar(){
    this.currentPage=0;
    this.estadoFinal=false;

    this.cancionesService.getAll(this.currentPage)
    .then(response=>{
      this.canciones = response;
    })
    .catch(err=>{
      console.log(err)
    })
  }

  insertFav(idCancion){
    this.cancionesService.anadirFav(this.user['id'].toString(),idCancion)
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

  isFavorit(idCancion:number): boolean{
    return (this.favs.find(item => item['id'] == idCancion) != undefined);
  }
}
