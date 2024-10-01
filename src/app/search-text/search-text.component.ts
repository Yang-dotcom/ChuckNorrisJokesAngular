import { Component, inject } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from '@angular/material/button';
import { HomeService } from '../services/home.service';
import { Joke } from '../interfaces/joke';
import { RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-search-text',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ReactiveFormsModule, MatButtonModule],
  templateUrl: './search-text.component.html',
  styleUrl: './search-text.component.css'
})
export class SearchTextComponent {

  homeService = inject(HomeService);
  searchResult: Joke[] = [];

  protected textForm = new FormGroup({
    text : new FormControl('')
  })

  public search(){
    const text = this.textForm.get('text')?.value?? null;
    this.homeService.searchByText(text)

  }
}
