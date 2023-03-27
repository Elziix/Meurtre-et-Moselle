/**
 * Module de composant pour l'affichage du background en flouté
 * @remarks
 * Ce composant est chargé d'afficher un fond flouté sur notre site web
 * @packageDocumentation
 */

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
