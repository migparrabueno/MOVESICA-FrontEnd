import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../usuarios.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formulario: FormGroup;

  constructor(private usuariosService: UsuariosService, private router: Router) { 
    this.formulario = new FormGroup({
      user_name:new FormControl(''), 
      password:new FormControl('')
    });
  }

  ngOnInit() {
  }

  onSubmit(){
    //console.log(this.formulario.value)
    let form = this.formulario.value;

    this.usuariosService.loginUser(form)
      .then((response)=>{
        if(response['token']){
          localStorage.setItem('user-token', response['token']); 
          //console.log(localStorage)
          this.router.navigate(['/profile'])
        }else{
          alert(response['error'])
        }
      })
      .catch((err)=>{
        alert('Error en el registro. Inténtalo más tarde.')
      })
  }

}
