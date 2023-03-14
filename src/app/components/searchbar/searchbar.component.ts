import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {getCityData, getLatitudeLongitude, getDepartment} from "../../app.component"
import { MapBoxComponent } from '../map-box/map-box.component';
import { HttpClient } from '@angular/common/http';
//import { getAffairesByDepartement } from '../card/card.component';
import { CardComponent } from '../card/card.component';


@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  constructor(private http: HttpClient, private cardComponent: CardComponent) { }
  
  ngOnInit(): void { 
    
  }

  nomCommune: string = '';
  coords: { lat: number, lng: number } | undefined;

  async search(city: string) {
    // Utilisez la fonction getLatitudeLongitude() pour récupérer les coordonnées de la ville
    getLatitudeLongitude(city).then(coord => {
      // Utilisez la fonction getCityData() pour récupérer le code département de la ville
      getCityData(coord?.lat, coord?.lng).then(cityData => {
        console.log(cityData.codeDepartement); // Affichez le code département dans la console
        const departement = cityData.codeDepartement;
        const listeAffaires = this.cardComponent.getAffairesByDepartement(this.http, departement); // Appel de la fonction getAffairesByDepartement() du composant CardComponent
      });
    });
  }
}


