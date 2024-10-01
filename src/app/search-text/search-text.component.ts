import { Component, inject, OnInit } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import { HomeService } from '../services/home.service';
import {MatInputModule} from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { Joke } from '../interfaces/joke';
import { RouterLink, RouterOutlet} from '@angular/router';
import { ResultSearch } from '../interfaces/resultsearch';

@Component({
  selector: 'app-search-text',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ReactiveFormsModule, MatButton, MatInputModule],
  templateUrl: './search-text.component.html',
  styleUrl: './search-text.component.css'
})
export class SearchTextComponent implements OnInit{

  homeService = inject(HomeService);
  resultSearch!: ResultSearch;
  arrayJokes: Joke[] = [];
  arrayJokesValues: string[] = [];
  totalJokes: number = 0;

  protected textForm = new FormGroup({
    text : new FormControl('')
  })

  public search(){
    const text = this.textForm.get('text')?.value?? null;
    this.homeService.searchByText(text).subscribe({
      next: (data: ResultSearch) => {
        this.resultSearch = data;
        this.arrayJokes = data.result;
        this.totalJokes = data.total;
        this.arrayJokesValues = this.arrayJokes.map(joke => joke.value);
      }
    })
  }

  ngOnInit(): void {
  }
}
