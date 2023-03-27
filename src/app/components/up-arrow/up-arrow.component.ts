/**
 * Module de composant pour l'affichage et l'utilisation de l'up-arrow.
 * @remarks
 * Ce composant est chargé d'effectuer un scroll to top de la page.
 * @packageDocumentation
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-up-arrow',
  templateUrl: './up-arrow.component.html',
  styleUrls: ['./up-arrow.component.css']
})
export class UpArrowComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }
  
}