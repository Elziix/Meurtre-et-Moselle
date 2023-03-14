import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {getCityData, getLatitudeLongitude, getDepartment} from "../../app.component"
import { MapBoxComponent } from '../map-box/map-box.component';
import { HttpClient } from '@angular/common/http';
import { getAffairesByDepartement } from '../card/card.component';


@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  constructor(private http: HttpClient) { }
  
  ngOnInit(): void { 
    
  }

  nomCommune: string = '';
  coords: { lat: number, lng: number } | undefined;
  
  async search() {
      const coords = await getLatitudeLongitude(this.nomCommune);
      const data = await getCityData(coords?.lat, coords?.lng)
      const dep = await getDepartment(data);
      console.log(dep);
      getAffairesByDepartement("Drôme");

      
    }
}


