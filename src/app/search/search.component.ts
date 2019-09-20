import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../usuarios.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  arrCancionesSeleccionadas: [];
  estadoPadre: boolean;
  

  constructor(private usuariosService: UsuariosService) {
    this.arrCancionesSeleccionadas = [];
    this.estadoPadre = false;
   }

  ngOnInit() {
  }

  onCanSeleccionadas($event){
    this.arrCancionesSeleccionadas = $event;
    //console.log(this.arrCancionesSeleccionadas)
  }

  onEstadoFilt($event){
    this.estadoPadre = $event;
  }


}
