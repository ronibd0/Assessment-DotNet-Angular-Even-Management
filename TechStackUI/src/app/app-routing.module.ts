import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestsComponent } from './pages/guests/guests.component';
import { EventsComponent } from './pages/events/events.component';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'guests', component: GuestsComponent },
  { path: 'events', component: EventsComponent },

];;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
