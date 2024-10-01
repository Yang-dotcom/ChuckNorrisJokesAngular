import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RandomJokeComponent } from './random-joke/random-joke.component';
import { SearchTextComponent } from './search-text/search-text.component';

export const routes: Routes = [
  {
    path : '', component: HomeComponent
  ,
  children: [
    { path: 'random-joke', component: RandomJokeComponent },  // Child route
    { path: 'search-text', component: SearchTextComponent }
  ]}

];
