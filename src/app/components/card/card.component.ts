import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Tueur {
  nom: string;
  description: string;
  lieu: string;
  crime: string;
  date: string;
  WikiLink: string;
  WikiPhoto: string;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit {
  Liste_tueur: Array<Tueur> = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const url = './assets/wikipedia.json';
    this.http.get(url).subscribe((data: any) => {
      const pageContent = data.query.pages["498241"].revisions[0]["*"];
      const regex: RegExp = / /m;
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
    });
  }
}
