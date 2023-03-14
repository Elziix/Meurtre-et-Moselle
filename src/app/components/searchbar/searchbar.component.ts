import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { getLatitudeLongitude } from '../../app.component';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent implements OnInit {

  // citySelected est considéré comme un evenement de type String
  @Output() citySelected = new EventEmitter<string>();

  // Le nom de la commune recherchée
  nomCommune: string = '';

  // Les coordonées de cette commune
  coords: { lat: number, lng: number } | undefined = undefined;

  constructor() {}

  ngOnInit(): void {}

  // Fonction asynchrone appelant searchCity avec le nom de la commune
  async search() {
    const coords = await getLatitudeLongitude(this.nomCommune);
    if (coords) {
      // On envoie l'output à map-box.component
      this.citySelected.emit(this.nomCommune);
    }
  }
}
