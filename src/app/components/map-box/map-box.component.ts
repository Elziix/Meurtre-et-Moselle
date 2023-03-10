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
  marker = new mapboxgl.Marker();

  constructor() { }

  ngOnInit(): void {
    (mapboxgl as typeof mapboxgl).accessToken = 'pk.eyJ1IjoiZWx6aXgiLCJhIjoiY2xleTB1cGdxMDBmbTN4bDUxMmR3ZWU4bCJ9.-UEOn7npmVEpi3mbP5TOUg';
    const map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 5,
      center: [this.lng, this.lat]
    });

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
    this.marker.setLngLat(coordinates).addTo(this.map!);
    console.log("marker ajouté");

    // Exemple d'utilisation de la fonction getCityData() avec la ville de Paris
    getCityData(coordinates.lat, coordinates.lng).then(cityData => {
      console.log(cityData); // Affiche les informations de la ville de Paris
    });
  }

  add_mark(lngLat: mapboxgl.LngLat){
    console.log("entre add_mark");
    const coordinates = lngLat;
    console.log('Lng:', coordinates.lng, 'Lat:', coordinates.lat);
    if(this.map!){
      console.log("map exists");
      this.marker.setLngLat(coordinates).addTo(this.map!);
      console.log("marker ajouté");
    }
  }
  
  searchCity(city: string) {
    console.log("entre dans searchCity : " + city);
    getLatitudeLongitude(city).then(coords => {
      console.log("entre dans getlati");
      const coo = new mapboxgl.LngLat(coords?.lng, coords?.lat);
      console.log(coo);
      //const mark = new mapboxgl.Marker();
      this.add_mark(coo);
      //console.log("set marker");
        //this.map!.flyTo({ center: [coords!.lng, coords!.lat], zoom: 12 });
     // }
    }.bind(this));
  }
}

}

