import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { getLatitudeLongitude } from '../../app.component';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent implements OnInit {
  @Output() citySelected = new EventEmitter<string>();

  nomCommune: string = '';
  coords: { lat: number, lng: number } | undefined = undefined;

  constructor() {}

  ngOnInit(): void {}

  async search() {
    const coords = await getLatitudeLongitude(this.nomCommune);
    if (coords) {
      this.citySelected.emit(this.nomCommune);
    }
  }
}
