import { Component, EventEmitter } from '@angular/core';

import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  departement = '';

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Meurtre & Moselle');
  }
}



const apiUrl = "https://geo.api.gouv.fr/communes"; // URL de l'API Geo de l'API Gouv
const apiUrlDep = "https://geo.api.gouv.fr/departements";

async function onSearchCity(city: string) {
  const coord = await getLatitudeLongitude(city);
  const { code } = await getCityData(coord?.lng, coord?.lat);
  const departement = code.substring(0, 2); // On récupère les deux premiers caractères du code postal qui correspondent au code du département
}

export async function getCityData(lati: number, longi: number) {
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

export async function getDepartment(dep: number) {
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

export async function getLatitudeLongitude(nomCommune: String) {
  // URL de la requête avec le nom de la commune en paramètre
  const url = `${apiUrl}?nom="${nomCommune}"&fields=centre&format=json&geometry=centre`;

  try {
    // Appel de l'API avec la méthode fetch() de JavaScript
    const response = await fetch(url);
    const data = await response.json();

    // Récupération des coordonnées de la commune
    const lat = data[0].centre.coordinates[1];
    const lng = data[0].centre.coordinates[0];

    console.log(lat, lng);

    // Retourne un objet contenant la latitude et la longitude
    return {
      lat,
      lng
    };
  } catch (error) {
    // En cas d'erreur, affiche le message d'erreur dans la console
    console.error(error);
  }
  return;
}

