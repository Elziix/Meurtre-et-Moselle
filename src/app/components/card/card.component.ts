
import { Component, OnInit } from '@angular/core';

interface Tueur {
  nom: string;
  description: string;
  lieu: string;
  crime: string;
  date: string;
  WikiLink :string;
  WikiPhoto :string;
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
    const url= "./wikipedia.json"
    fetch(url)
      .then(response => response.json()) 

        const data = JSON.parse(url);

        console.log(data.query.pages["498241"].revisions[0].contentformat); // "text/x-wiki"
        console.log(data.query.pages["498241"].revisions[0]["*"]); // "wikitext"
        const pageContent=data.query.pages["498241"].revisions[0]["*"]; // "{{À wikifier|date=novembre 2020}}\nCette page présente de manière non exhaustive des '''affaires [[Crime en France|criminelles françaises]]''' notoires, et rédactionnées sur Wikipédia.\n\n== Liste partielle ==\n=== Jusqu'en 1900 ===\n{{Article détaillé|Liste d'affaires criminelles françaises}}"


        // utilisation de regex pour extraire les informations souhaitées
        //const regex: RegExp = /^-\n\|\[\[(\d{4})\]\]\n\|\[\[(.+?)\]\]\n\|\[\[(.+?)\|(.+?)\]\]\n\|(.+?)\n\|(.+?)\./m;
        
        const regex: RegExp = /Françaises/m;
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
              crime: crime,
              date: date,
              WikiLink:"https://fr.wikipedia.org/wiki/"+title,
              WikiPhoto:""

            });
        } else {
          console.log("Impossible de trouver les informations requises");
        }
      }
      
}

