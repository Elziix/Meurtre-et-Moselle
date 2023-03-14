import { environment } from '../../../environments/environment';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { getCityData, getLatitudeLongitude } from "../../app.component"

@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.css']
})

export class MapBoxComponent implements OnInit {

  map?: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v12';
  lat = 47;
  lng = 2.5;
 
  isMapInitialized = false;
  marker?: mapboxgl.Marker;
  constructor() { }

  ngOnInit(): void {
    (mapboxgl as typeof mapboxgl).accessToken = 'pk.eyJ1IjoiZWx6aXgiLCJhIjoiY2xleTB1cGdxMDBmbTN4bDUxMmR3ZWU4bCJ9.-UEOn7npmVEpi3mbP5TOUg';
    const map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 5,
      center: [this.lng, this.lat]
    });
    this.marker = new mapboxgl.Marker();

    //map.dragRotate.disable();
    map.on('click', this.add_marker.bind(this));
    this.map = map;

  }

  add_marker(event: { lngLat: mapboxgl.LngLat; }) {
    console.log("entre add_marker");
    const coordinates = event.lngLat;
    console.log('Lng:', coordinates.lng, 'Lat:', coordinates.lat);
    console.log("ajout du marker")
    if(this.map!){
      console.log("map exists");
    }
    if (this.map && this.marker) {
      this.marker.setLngLat(coordinates).addTo(this.map);
      this.map.flyTo({ center: coordinates, zoom: 8 });
    }
    console.log("marker ajouté");

    // Exemple d'utilisation de la fonction getCityData() avec la ville de Paris
    getCityData(coordinates.lat, coordinates.lng).then(cityData => {
      console.log(cityData); // Affiche les informations de la ville de Paris
    });
  }

  // Cette fonction prends une ville en paramètre, recherche les coordonnées de cette ville et ajoute un markeur à cet endroit de la map
  searchCity(city: string) {
    console.log('entre dans searchCity : ' + city);
    getLatitudeLongitude(city)
      .then((coords) => {
        console.log('Coordonnées de la ville', coords);
        if (this.map && coords) {
          this.marker?.setLngLat(coords).addTo(this.map);
          this.map.flyTo({ center: coords, zoom: 8 });
        }
      })
      .catch((err) => {
        console.error(
          'Erreur lors de la récupération des coordonnées de la ville',
          err
        );
      });
  }
  
  
  
  
  
  
}

