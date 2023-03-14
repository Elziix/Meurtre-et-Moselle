import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Tueur {
  date: string;
  departement: string;
  affaire: string;
  resume: string;
  comments: string;
  WikiPhoto: string;
  WikiLink: string;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit {
  listeAffaires: Array<Tueur> = [];

  constructor() { }

  ngOnInit(): void {

  }

  getAffairesByDepartement(http: HttpClient, departement: string): Observable<Array<Tueur>> {
    const url = './assets/data.json';
    return http.get(url).pipe(
      map((data: any) => {
        const listeAffaires: Array<Tueur> = [];
        const entries = data.entries;
        entries.filter((entry: any) => {
          return entry.departement === departement;
        }).forEach((entry: any) => {
          listeAffaires.push({
            date: entry.date,
            departement: entry.departement,
            affaire: entry.affaire,
            resume: entry.resume,
            comments: entry.comments,
            WikiPhoto: entry.WikiPhoto,
            WikiLink: entry.WikiLink
          });
        });
        return listeAffaires;
      })
    );
  }

}