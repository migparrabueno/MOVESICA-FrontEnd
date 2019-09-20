import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  baseURL: string;
  user: [];

  constructor(private http:HttpClient) {
    this.baseURL = "http://localhost:3000/api/usuarios"
    this.user = [];

   }

   //Método para crear unnuevo usuario
   newUser(values){
     return this.http.post(`${this.baseURL}/registro`, values).toPromise();
   }

   //Método para loguear
   loginUser(values){
     return this.http.post(`${this.baseURL}/login`, values).toPromise();
   }

   //Método para comprobar el login
   isUserLogged(){
    if(localStorage.getItem('user-token')) return true;
    return false;
  }

  //Método para devolver usuario por Id
  getUserById(pId){
    return this.http.get(`${this.baseURL}/${pId}`).toPromise();
  }

  //Método para editar usuario por Id
  updateUser(pId, values){
    return this.http.put(`${this.baseURL}/edit/${pId}`, values).toPromise();
  }

  //Métodos para recoger usuario después de login
  getUser(){
    let httpOptions = {
      headers:new HttpHeaders({ //incluyo el token como cabecera 
        'authentication': localStorage.getItem('user-token')
    })
    };
    //console.log(httpOptions)
    return this.http.post(`${this.baseURL}/profile`,{}, httpOptions).toPromise();
  }  
}
