
import { Component, OnInit } from '@angular/core';

interface Tueur {
  nom: string;
  description: string;
  lieu: string;
  crime: string;
  date: string;
  WikiLink :string;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit {
  Liste_tueur: Array<Tueur> = [];

  constructor() {
    
  }

  ngOnInit(): void {
    const url: string = "Access-Control-Allow-Origin https://fr.wikipedia.org/w/api.php?action=query&titles=Liste_d%27affaires_criminelles_françaises&prop=revisions&rvprop=content&format=json";

    fetch(url)
      .then(response => response.json())
      .then((data: any) => {
        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];
        const pageContent = pages[pageId].revisions[0]['*'];

        // utilisation de regex pour extraire les informations souhaitées
        // refaire le parsing
        const regex: RegExp = /^-\n\|\[\[(\d{4})\]\]\n\|\[\[(.+?)\]\]\n\|\[\[(.+?)\|(.+?)\]\]\n\|(.+?)\n\|(.+?)\./m;
        const match = pageContent.match(regex);
        if (match) {
        const date: string = match[1];
        const place: string = match[2];
        const crime: string = match[4];
        const title: string = match[3];
        const description: string = match[5];
        
        console.log(`Date: ${date}\nLieu: ${place}\nTitre: ${title}\nCrime: ${crime}\nDescription: ${description}`);

            // Ajout de valeurs au tableau Liste_tueur
            this.Liste_tueur.push({
              nom: title,
              description: description,
              lieu: place,
              crime: "",
              date: date,
              WikiLink:"https://fr.wikipedia.org/wiki/"+title
            });
        } else {
          console.log("Impossible de trouver les informations requises");
        }
      })
      .catch(error => console.error(error));
  }
}
