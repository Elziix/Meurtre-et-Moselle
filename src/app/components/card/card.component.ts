import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
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

export class CardComponent implements OnInit, OnChanges {
  listeAffaires: Array<Tueur>;
  @Input() departement: string;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { this.listeAffaires = [], this.departement = "Seine" }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['departement'] && !changes['departement'].firstChange) {
      console.log("Appel de fetchAffaire sur : ", changes['departement'].currentValue);
      this.getAffaires(changes['departement'].currentValue).subscribe((listeAffaires: Tueur[]) => {
        this.listeAffaires = listeAffaires;
        console.log("Liste des affaires pour le département " + changes['departement'].currentValue + " : ", listeAffaires);
      });
    }
  }

  getAffaires(departement: string): Observable<Array<Tueur>> {
    const url = './assets/data.json';
    console.log('Entre dans getAffaires');
    return this.http.get(url).pipe(
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
            WikiPhoto: entry.WikiPhoto,
            WikiLink: entry.WikiLink
          });
        });
        console.log(listeAffaires);
        return listeAffaires;
      })
    );
  }
}