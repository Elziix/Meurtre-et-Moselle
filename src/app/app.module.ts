import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importez FormsModule ici

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { BackgroundComponent } from './components/background/background.component';
import { ExplanationComponent } from './components/explanation/explanation.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { CardComponent } from './components/card/card.component';
import { AboutComponent } from './components/about/about.component';
import { UpArrowComponent } from './components/up-arrow/up-arrow.component';
import { MapBoxComponent } from './components/map-box/map-box.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    BackgroundComponent,
    ExplanationComponent,
    SearchbarComponent,
    CardComponent,
    AboutComponent,
    UpArrowComponent,
    MapBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [MapBoxComponent, CardComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
