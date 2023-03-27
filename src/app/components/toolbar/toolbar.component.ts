/**
 * Module de composant pour l'affichage et l'utilisation de la toolbar.
 * @remarks
 * Ce composant est chargé d'effectuer l'affichage de la toolbar et du pop-up About us
 * @packageDocumentation
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }
  
  showPopup = false;
}

