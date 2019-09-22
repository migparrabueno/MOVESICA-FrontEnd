import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import { UsuariosService } from '../usuarios.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro-user',
  templateUrl: './registro-user.component.html',
  styleUrls: ['./registro-user.component.css']
})
export class RegistroUserComponent implements OnInit {

  formulario: FormGroup;

  constructor(private usuariosService: UsuariosService, private router: Router) {
    this.formulario = new FormGroup({
      nombre:new FormControl('', [
        Validators.required,
         Validators.maxLength(10) 
      ]), 
      email:new FormControl('', [Validators.required, Validators.pattern('^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$')]),
      password:new FormControl('', [Validators.pattern('(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$'), Validators.required]),
      password_repeat:new FormControl('', Validators.required),
      edad:new FormControl('', []),
      cpostal:new FormControl('', [Validators.required, this.validatorCPostal])
    },[ //validadores a nivel de formulario:
      this.equalPasswordValidator
    ]);
   }

  ngOnInit() {
    let controlEmail = this.formulario.controls['email']
    controlEmail.valueChanges.pipe(debounceTime(500)).subscribe((value)=>{ //esto comprueba los cambios pasados 500 ms
    })
  }

  onSubmit(){
    console.log(this.formulario.value)
    let form = this.formulario.value;
    let values = {
      user_name: form.nombre,
      email: form.email,
      password: form.password,
      edad: form.edad,
      codigo_postal: form.cpostal
    }
    console.log(values);

    this.usuariosService.newUser(values)
      .then((response)=>{
        console.log(response);
        this.router.navigate(['/login'])
      })
      .catch((err)=>{
        console.log(err)
      })
  }

  equalPasswordValidator(form){ //recibe el formulario entero 
    let passwordValue = form.controls['password'].value;
    let passwordRepeatValue = form.controls['password_repeat'].value;

    if(passwordValue == passwordRepeatValue){
      return null;
    }else{
      return {passwordValidator: 'Las contraseñas deben ser iguales'}
    }
    
  }

  validatorCPostal(control){
    let postal = control.value;
    if(postal.length == 5 && parseInt(postal) >= 1000 && parseInt(postal) <= 52999)
    {
      return null;
    }
    else{
      return {cpostal: 'El código postal es incorrecto'}
    }
  }

}
