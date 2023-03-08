import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dashfront';
}

const apiUrl = "https://geo.api.gouv.fr/communes"; // URL de l'API Geo de l'API Gouv
    const apiUrlDep = "https://geo.api.gouv.fr/departements";

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