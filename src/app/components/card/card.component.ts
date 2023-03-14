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
  WikiPhoto : null;
  WikiLink : null;
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
    const url = './assets/data.json';
    this.http.get(url).pipe(
      map((data: any) => {
        const entries = data.entries;
        entries.forEach((entry: any) => {
          this.listeAffaires.push({
            date: entry.date,
            departement: entry.departement,
            affaire: entry.affaire,
            resume: entry.resume,
            comments: entry.comments,
            WikiPhoto: null,
            WikiLink : null
            
          });
          console.log(this.listeAffaires[0]);
        });
      })
    ).subscribe();
  }
}