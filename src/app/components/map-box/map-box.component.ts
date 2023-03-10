import { environment } from '../../../environments/environment';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {getCityData} from "../../app.component"

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

  constructor() { }

  ngOnInit(): void {

    (mapboxgl as typeof mapboxgl).accessToken = 'pk.eyJ1IjoiZWx6aXgiLCJhIjoiY2xleTB1cGdxMDBmbTN4bDUxMmR3ZWU4bCJ9.-UEOn7npmVEpi3mbP5TOUg';
    const map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 5,
      center: [this.lng, this.lat]
    });

    var marker = new mapboxgl.Marker();
    
    function add_marker(event: { lngLat: mapboxgl.LngLat; }) {
      const coordinates = event.lngLat;
      console.log('Lng:', coordinates.lng, 'Lat:', coordinates.lat);
      marker.setLngLat(coordinates).addTo(map);

      // Exemple d'utilisation de la fonction getCityData() avec la ville de Paris
      getCityData(coordinates.lat, coordinates.lng).then(cityData => {
        console.log(cityData); // Affiche les informations de la ville de Paris
      });

    }

    //map.dragRotate.disable();

    map.on('click', add_marker);





  }
}



