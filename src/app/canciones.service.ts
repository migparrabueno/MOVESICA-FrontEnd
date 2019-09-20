import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CancionesService {
  baseURL: string;
  estado: boolean;

  constructor(private http:HttpClient) {
    this.baseURL = "http://localhost:3000/api/canciones";
    this.estado = false;
   }

   //Método para recuperar 10 canciones por página
   getAll(numPag):Promise <any>{
     return this.http.get(this.baseURL+`/page/${numPag}`).toPromise();
   }

   //Método para recuperar todas las canciones
   getAlll():Promise <any>{
    return this.http.get(this.baseURL).toPromise();
  }

  //Método para filtrar
  getByFilter(values):Promise <any>{
    return this.http.post(this.baseURL+`/filter`, values).toPromise();
  }

  //Método para añadir una canción a favoritos
  anadirFav(idUser,idCancion):Promise <any>{
    return this.http.post(this.baseURL+`/fav/${idUser}`,{idCancion: idCancion}).toPromise();
  }

  //Método para borrar una canción de favoritos
  delFav(idUser,idCancion):Promise <any>{
    return this.http.post(this.baseURL+`/fav/del/${idUser}`,{idCancion: idCancion}).toPromise();
  }

  //Método para obtener todas las canciones favoritas de un user
  getFavs(idUser):Promise <any>{
    return this.http.get(this.baseURL+`/fav/${idUser}`).toPromise();
  }
}