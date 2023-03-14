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
  WikiPhoto : string;
  WikiLink : string;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit {
  listeAffaires: Array<Tueur> = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    
  }


}

export function getAffairesByDepartement(this: any, departement: string): Array<Tueur> {
  const url = './assets/data.json';
  const listeAffaires: Array<Tueur> = [];
  this.http.get(url).pipe(
    map((data: any) => {
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
          WikiLink : entry.WikiLink
        });
      });
    })
  ).subscribe();
  return listeAffaires;
}
