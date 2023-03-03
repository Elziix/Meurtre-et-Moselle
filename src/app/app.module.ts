import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { BackgroundComponent } from './components/background/background.component';
import { ExplanationComponent } from './components/explanation/explanation.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { CardComponent } from './components/card/card.component';
import { AboutComponent } from './components/about/about.component';
import { UpArrowComponent } from './components/up-arrow/up-arrow.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    BackgroundComponent,
    ExplanationComponent,
    SearchbarComponent,
    CardComponent,
    AboutComponent,
    UpArrowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
