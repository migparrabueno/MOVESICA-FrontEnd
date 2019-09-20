import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../usuarios.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  user: {};
  formulario: FormGroup;

  constructor(private usuariosService: UsuariosService, private router: Router) {
    this.user={};
    this.formulario = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellidos: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      foto_perfil: new FormControl(''),
      edad: new FormControl('', Validators.required),
      codigo_postal: new FormControl('', Validators.required),
      user_name:new FormControl('', Validators.required) 
      /* password:new FormControl('') */
    });
  }

  ngOnInit() {
    this.usuariosService.getUser()
      .then((response)=>{
        this.usuariosService.getUserById(response['userId'])
        .then((response)=>{
          this.user = response;
          console.log(this.user)
        })
        .catch((err)=>{
          console.log(err)
        })
        
      })
      .catch((err)=>{
        console.log(err)
      })
  }

  onSubmit(){
    //console.log(this.formulario.value)
    let form = this.formulario.value;
    console.log(this.user['id'],form);
    this.usuariosService.updateUser(this.user['id'], form)
    .then((response)=>{
      console.log(response)
    })
    .catch(err=>{
      console.log(err)
    })
    this.router.navigate(['/profile'])

  }

}

