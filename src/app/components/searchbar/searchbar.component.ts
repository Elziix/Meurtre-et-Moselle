import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  constructor() { }
  
  ngOnInit(): void { 

  }

  @ViewChild('search') search: ElementRef | undefined;
  getValue() {
    // Afficher la valeur
    alert(this.search?.nativeElement.value);
  }

}
