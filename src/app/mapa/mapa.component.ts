import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CancionesService } from '../canciones.service';

declare var google;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  @ViewChild('googleMap',{static: false}) gMapElement: any;
  @ViewChild('inputPlaces',{static: false}) inputPlacesElement: any;
  map: any;
  @Input() canciones: any[];
  @Input() estado: boolean;
  estadoFinal: boolean;


  directionsService: any; //Variable para ejecutar la petición de la ruta
  directionsDisplay: any; //Variable para visualizar la ruta gráficamente

  constructor(private cancionesService: CancionesService) {
    this.canciones = [];
    this.estadoFinal = this.estado;

   }

  ngOnInit() {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
        this.loadMap(position.coords)
      }, this.showError)
    } else{
      console.log('Problamas con la API de google')
    } 
    
    //Recupera las canciones del back
    this.cancionesService.getAlll()
        .then(response=>{
          this.canciones = response;
        })
        .catch(err=>{
          console.log(err)
        })
  }

  ngOnChanges(){
    this.estadoFinal = this.estado;

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
        this.loadMap(position.coords)
      }, this.showError)
    } else{
      console.log('Problamas con la API de google')
    }
  }
  
  reiniciar(){
    this.estadoFinal=false;

    this.cancionesService.getAlll()
    .then(response=>{
      this.canciones = response;
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
          this.loadMap(position.coords)
        }, this.showError)
      } else{
        console.log('Problamas con la API de google')
      }
    })
    .catch(err=>{
      console.log(err)
    })
  }

  loadMap(currentCoords){
    //inicializamos las variables para hacer la ruta
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();

    let mapProps = {
      center: new google.maps.LatLng(currentCoords.latitude, currentCoords.longitude),
      zoom: 14, //tipo de zoom
      mapTypeId: google.maps.MapTypeId.HYBRID
    }
    //Crear mapa
    this.map = new google.maps.Map(this.gMapElement.nativeElement, mapProps);

    //Comunicamos al directionsDisplay cuál es su mapa y dónde pintarlo
    this.directionsDisplay.setMap(this.map);

    //Creamos y asignamos marcador al mapa
    let marker = new google.maps.Marker({position: mapProps.center, title: 'aquí estoy', animation: google.maps.Animation.BOUNCE});
    marker.setMap(this.map);


    ////////////////////////////////////////
    //Muestro todas las canciones en el mapa
    var infowindow = new google.maps.InfoWindow();
    for(let i=0; i<=this.canciones.length; i++) {
      //Creo la tarjeta en cada marker
      let markerSong = new google.maps.Marker({
      position: {lat: this.canciones[i].latitud, lng: this.canciones[i].longitud},
      title: `${this.canciones[i].nombre}. Autor: ${this.canciones[i].autor}`,
      content:'<div id="content" style="width: 400px; height: 250px;">'+
              '<div id="siteNotice">'+
              '</div>'+
              `<h1 id="firstHeading" class="firstHeading">${this.canciones[i].nombre}</h1>`+
              '<div id="bodyContent">'+
              '<p><b>Autor: </b>'+`${this.canciones[i].autor} `+ `(${this.canciones[i].grupo})`+'</p>'+
              '<p><b>Género: </b>'+`${this.canciones[i].estilo} `+'</p>'+
              '<p><b>Año: </b>'+`${this.canciones[i].anio} `+'</p>'+
              '<div><a href="'+`${this.canciones[i].youtube}`+'" target="_blank"><i class="fab fa-youtube fa-2x fa-lg" style="color:red; cursor:pointer"></i></a><a href="'+`${this.canciones[i].spotify}`+'" target="_blank"><i class="fab fa-spotify fa-2x fa-lg ml-2" style="color:green; cursor:pointer"></i></a></div>'+
              '</div>'+          
              '</div>'
        });

        markerSong.addListener('click', function() {
          infowindow.setContent(this.content);
          infowindow.open(this.map, markerSong);
        });  
          
        markerSong.setMap(this.map);
      }
  }

 //Filtramos los posibles errores a la hora de cargar el mapa o que el usuario otorgue permisos
  showError(error){
switch(error.code){
  case error.PERMISSION_DENIED: { //en caso de que el usuario le de a no compartir ubicación
    console.log('El usuario no permite localizarlo');
    break;
  }
  case error.POSITION_UNAVAILABLE:{
    console.log('La posición no está disponible');
    break;
  }
  case error.TIMEOUT:{
    console.log('Se ha terminado el tiempo de espera');
    break;
  }
  case error.UNKNOWN_ERROR:{
    console.log('KA PACHAO?');
    break;
  }
}
}

}
