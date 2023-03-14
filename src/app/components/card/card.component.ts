import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SharedService } from '../shared.service';

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
  depName: string = '';
  listeAffaires: Array<Tueur> = [];

  fetchAffaires(): void {
    this.getAffaires(this.depName).subscribe((result: Array<Tueur>) => {
      this.listeAffaires = result;
    });
  }

  constructor(private http : HttpClient, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.depName = this.sharedService.depName;
    this.getAffaires('Drôme');
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
        return listeAffaires;
      })
    );
  }
  



}