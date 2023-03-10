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
   
          const title: string = "";
          const date: string = "";
          const place: string = "";
          const description: string = "";


            // Ajout de valeurs au tableau Liste_tueur
            this.Liste_tueur.push({
              nom: title,
              description: description,
              lieu: place,
              crime: "",
              date: date,
              WikiLink:"https://fr.wikipedia.org/wiki/"+title
            });

            this.Liste_tueur.push({
              nom: title,
              description: description,
              lieu: place,
              crime: "",
              date: date,
              WikiLink:"https://fr.wikipedia.org/wiki/"+title
            });


  }
}
