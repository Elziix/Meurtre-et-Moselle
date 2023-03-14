import { Component, OnInit, ViewChild } from '@angular/core';
import { AboutComponent } from '../about/about.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @ViewChild(AboutComponent) aboutComponent!: AboutComponent;

  constructor() { }

  ngOnInit(): void {
  }

  openAboutPopup() {
    this.aboutComponent.openPopup();
  }
}
