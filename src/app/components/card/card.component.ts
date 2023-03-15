import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Tueur {
  date: string;
  departement: string;
  WikiPhoto: string;
  WikiLink: string;
  affaire: string;
  resume: string;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit {
  listeAffaires: Array<Tueur> = [];
  @Output() depSelected = new EventEmitter<string>();
  dep : string =  this.depSelected.toString();

  constructor(private http : HttpClient) { }

  ngOnInit(): void {
    this.fetchAffaires(this.dep);
  }

  getAffaires(departement: string): Observable<any[]> {
    const url = "./assets/data.json"
    return this.http.get(url).pipe(
      map((data: any) => {
        const listeAffaires: Array<any> = [];
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
        console.log(listeAffaires);
        return listeAffaires;
      })
    );
  }

  fetchAffaires(departement : string): void {
  //this.depSelected = departement;
  console.log("entre dans fetchAffaires : ", this.dep);
  this.getAffaires(departement).subscribe((result: Array<Tueur>) => {
    this.listeAffaires = result;
    this.depSelected.next(departement); // mettre à jour le composant parent avec le nouveau département
  });
}

  



}