import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import { CancionesService } from '../canciones.service';


@Component({
  selector: 'app-form-home',
  templateUrl: './form-home.component.html',
  styleUrls: ['./form-home.component.css']
})
export class FormHomeComponent implements OnInit {

  formulario: FormGroup;
  @Output() onEstado: EventEmitter<any>;
  @Output() onCancionesFiltradas: EventEmitter<any>;
  estado: boolean;

  constructor(private cancionesservice: CancionesService) { 
    this.formulario = new FormGroup({
      nombre:new FormControl('', ), 
      estilo:new FormControl('', ),
      epoca:new FormControl('', ),
      grupo:new FormControl('', ),
      cercaUser:new FormControl('', ),
      cercaRuta:new FormControl('', ),
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
