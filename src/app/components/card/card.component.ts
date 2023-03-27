/**
 * Module de composant pour l'affichage des affaires.
 * @remarks
 * Ce composant est chargé d'afficher les affaires liées à un département sur la page web.
 * @packageDocumentation
 */
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Interface nous permettant de récupérer les informations liées à une affaire via recherche dans le JSON
 */
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
  /**
   * La liste des affaires liées à la recherche
  */
  listeAffaires: Array<Tueur>;

  /**
   * Récupère le département entré dans la searchbar
   */
  @Input() departement: string;
  
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { this.listeAffaires = [], this.departement = "" }

  ngOnInit(): void { 

  }

  /**
   * Au changement detecté, on parcourt le JSON et on recherche les affaires liées au département stocké actuellement
   * @param changes le changement à détecter
   */
  ngOnChanges(changes: SimpleChanges) {
    const element = document.getElementById('scroll');
    if (changes['departement'] && !changes['departement'].firstChange) {
      console.log("Appel de fetchAffaire sur : ", changes['departement'].currentValue);
      this.getAffaires(changes['departement'].currentValue).subscribe((listeAffaires: Tueur[]) => {
        this.listeAffaires = listeAffaires;
        console.log("Liste des affaires pour le département " + changes['departement'].currentValue + " : ", listeAffaires);
        var cardColumns = document.querySelector('.card-columns');
        if (this.listeAffaires.length < 3) {
            cardColumns?.classList.add('center-cards');
        } else {
            cardColumns?.classList.add('three-columns');
        }
        setTimeout(() => {
          document.getElementById("scroll")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
          });
        }, 1000); // Attendre 1 seconde avant de scroller vers le bas
      });
    }
  }

  /**
   * Recherche les affaires liées à un département
   * @param departement le département dans lequel sesont déroulées les affaires recherchées
   * @returns la liste des affaires
   */
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
        if (listeAffaires.length === 0) {
          entries.filter((entry: any) => {
            return entry.departement === "?";
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
        }
        console.log(listeAffaires);
        return listeAffaires;
      })
    );
  }
}