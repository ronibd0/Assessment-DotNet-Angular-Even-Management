import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './attributes/header/header.component';
import { FooterComponent } from './attributes/footer/footer.component';
import { GuestsComponent } from './pages/guests/guests.component';
import { EventsComponent } from './pages/events/events.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    GuestsComponent,
    EventsComponent,
    HomeComponent,

  ],
  entryComponents: [

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
