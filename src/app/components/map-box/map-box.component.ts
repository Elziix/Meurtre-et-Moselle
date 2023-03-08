import { environment } from '../../../environments/environment';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.css']
})
export class MapBoxComponent implements OnInit {

  map?: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 55.665957;
  lng = 12.550343;

  constructor() { }

  ngOnInit(): void {

    (mapboxgl as typeof mapboxgl).accessToken = 'pk.eyJ1IjoiZWx6aXgiLCJhIjoiY2xleTB1cGdxMDBmbTN4bDUxMmR3ZWU4bCJ9.-UEOn7npmVEpi3mbP5TOUg';
    const map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 8,
      center: [this.lng, this.lat]
    });

    var marker = new mapboxgl.Marker();

    function add_marker(event: { lngLat: mapboxgl.LngLat; carte: mapboxgl.Map;}) {
      const coordinates = event.lngLat;
      console.log('Lng:', coordinates.lng, 'Lat:', coordinates.lat);
      marker.setLngLat(coordinates).addTo(map);
    }

    map.dragRotate.disable();

    map.on('click', add_marker);

  }
}



