import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {getLatitudeLongitude} from "../../app.component"
//import {add_marker} from "../map-box/map-box.component"

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  constructor() { }
  
  ngOnInit(): void { 
    
  }

  nomCommune: string = '';
  coords: { latitude: number, longitude: number } | undefined = undefined;

  async search() {
    this.coords = await getLatitudeLongitude(this.nomCommune);
    //add_marker(this.coords);
  }


}
