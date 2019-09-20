import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
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
    //console.log(this.estadoPadre)
  }

}
