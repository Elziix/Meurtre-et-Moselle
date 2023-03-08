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

    const apiUrl = "https://geo.api.gouv.fr/communes"; // URL de l'API Geo de l'API Gouv
    const apiUrlDep = "https://geo.api.gouv.fr/departements";

    async function getCityData(lati: number, longi: number) {
      const url = `${apiUrl}?lat=${lati}&lon=${longi}&fields=nom,code,codesPostaux,siren,codeEpci,codeDepartement,codeRegion,population&format=json`;
    
      try {
        const response = await fetch(url);
        const data = await response.json();
    
        const cityData = data[0];
    
        // Call getDepartment with the department code from cityData
        getDepartment(cityData.codeDepartement).then(departmentData => {
          console.log(departmentData); // Display department data
        });
    
        return cityData;
      } catch (error) {
        console.error(error);
      }
    }

    async function getDepartment(dep: number) {
      const url = `${apiUrlDep}?code=${dep}&fields=nom,code,codeRegion`

      try {
        // Effectuer la requête à l'API
        const response = await fetch(url);

        // Convertir la réponse en objet JSON
        const data = await response.json();

        // Renvoyer les données de la première ville trouvée
        return data[0];
      } catch (error) {
        console.error(error);
      }
    }

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



