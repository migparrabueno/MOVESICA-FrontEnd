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


  directionsService: any; //declaramos una variable para ejecutar la petición de la ruta
  directionsDisplay: any; //declaramos otra variable para visualizar la ruta gráficamente

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
    
    //Recupero las canciones de la BBDD
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
    //console.log(this.estadoFinal);

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
      mapTypeId: google.maps.MapTypeId.HYBRID //tipo de mapa que vamos a usar. Los otros son: ROADMAP, SATELLITE, TERRAIN. 
    }
    //ahora creamos el mapa
      this.map = new google.maps.Map(this.gMapElement.nativeElement, mapProps); //primer parámetro el elemento y el segundo las propiedades.

      //Le digo al directionsDisplay cuál es su mapa donde pintarse
      this.directionsDisplay.setMap(this.map);

      let marker = new google.maps.Marker({position: mapProps.center, title: 'aquí estoy', animation: google.maps.Animation.BOUNCE}); //configuramos la posición del marcador,título, animación (DROP es otra)..
      marker.setMap(this.map); //le asignamos al marcador un mapa


      ////////////////////////////////////////
      //Muestro todas las canciones en el mapa
      var infowindow = new google.maps.InfoWindow();
      for(let i=0; i<=this.canciones.length; i++) {

              
        //Creo la tarjeta en cada marker
        let markereee = new google.maps.Marker({
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

        markereee.addListener('click', function() {
          infowindow.setContent(this.content);
          infowindow.open(this.map, markereee);
        });  
          
        markereee.setMap(this.map);
      }

     

      //AUTOCOMPLETE
      let autocomplete = new google.maps.places.Autocomplete(this.inputPlacesElement.nativeElement);
      // let autocomplete = new google.maps.places.Autocomplete(document.getElementById('iPlaces')); donde iPlaces es un id que le colocamos en el html al elemento. Sería lo mismo.

      let self = this;//esto va a ser necesario para "engañar" y poder hacer un this dentro del function de abajo.
      //Aquí le estamos diciendo qué elementos se trae de la api de google.
      autocomplete.setFields(['address_components','geometry','icon','name']);
      //Aquí llamamos al evento  para capturar la info que seleccionamos.
      autocomplete.addListener('place_changed', function(){
        let place = autocomplete.getPlace();
        //console.log(place.geometry.location.lat());
        //console.log(place.geometry.location.lng());
        //console.log(self.map);
        self.map.setCenter(place.geometry.location);//esto cambia el centro del mapa al elemento que he seleccionado
        //marcamos el lugar seleccionado en el select
        let markerBusqueda = new google.maps.Marker({position: place.geometry.location});
        markerBusqueda.setMap(self.map);

      })
    }

        //Método que calcula la ruta entre dos puntos cuando pulso un botón.
 /*  onclick(){
    let start = 'madrid, es';
    let end = 'valencia, es';
    //Creamos las opciones de la petición

    let opts = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.DRIVING //puede ser WALKING
    }
    //lanzamos la petición con un route
    let self = this;
    this.directionsService.route(opts, (result, status) => {
      console.log(result)
      self.directionsDisplay.setDirections(result);
    })
 } */ 


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
