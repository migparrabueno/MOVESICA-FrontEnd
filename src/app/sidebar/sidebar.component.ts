import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CancionesService } from '../canciones.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output() onEstado: EventEmitter<any>;
  @Output() onCancionesFiltradas: EventEmitter<any>;
  formulario: FormGroup;
  estado: boolean;

  constructor(private cancionesservice: CancionesService) {
    this.formulario = new FormGroup({
      nombre:new FormControl('', ), 
      estilo:new FormControl('', ),
      epoca:new FormControl('', ),
      grupo:new FormControl('', ),
      cercaUser:new FormControl('', ),
      cercaRuta:new FormControl('', )
    });
    this.onEstado = new EventEmitter();
    this.onCancionesFiltradas = new EventEmitter();
    this.estado = false;
   }

  ngOnInit() {
  }

  onSubmit(){
    
    this.onEstado.emit(true);

    this.cancionesservice.getByFilter(this.formulario.value)
    .then(result=>{
      this.onCancionesFiltradas.emit(result);
    })
    .catch(err=>{
      console.log(err)
    })
  } 

}
