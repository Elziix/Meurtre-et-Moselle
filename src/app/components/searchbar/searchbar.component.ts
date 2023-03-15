import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { getCityData, getDepartment, getLatitudeLongitude } from '../../app.component';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent implements OnInit {

  // citySelected est considéré comme un evenement de type String
  @Output() citySelected = new EventEmitter<string>();
  @Output() depSelected = new EventEmitter<string>();
  //@Output() depSelected = new EventEmitter<string>();

  // Le nom de la commune recherchée
  nomCommune: string = '';

  // Les coordonées de cette commune
  coords: { lat: number, lng: number } | undefined = undefined;

  constructor() { }

  ngOnInit(): void { }

  // Fonction asynchrone appelant searchCity avec le nom de la commune
  async search() {
    const coords = await getLatitudeLongitude(this.nomCommune);
    if (coords) {
      const cityData = await getCityData(coords?.lat, coords?.lng);
      const depCode = cityData.codeDepartement;
      const dep = await getDepartment(depCode);
      const depName = dep.nom;
    
      this.citySelected.emit(this.nomCommune);
      this.depSelected.emit(depName);
    }
  }
}
