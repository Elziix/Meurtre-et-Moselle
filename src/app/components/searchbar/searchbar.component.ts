import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {getLatitudeLongitude} from "../../app.component"
import { MapBoxComponent } from '../map-box/map-box.component';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  constructor(private mapBoxComponent: MapBoxComponent) { }
  
  ngOnInit(): void { 
    
  }

  nomCommune: string = '';
  coords: { lat: number, lng: number } | undefined = undefined;
  
  async search() {
    //this.coords = await getLatitudeLongitude(this.nomCommune);
      this.mapBoxComponent.searchCity(this.nomCommune);
    }
  }


