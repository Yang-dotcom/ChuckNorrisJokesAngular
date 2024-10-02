import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import { HomeService } from '../services/home.service';
import {MatInputModule} from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { Joke } from '../interfaces/joke';
import { RouterLink, RouterOutlet} from '@angular/router';
import { ResultSearch } from '../interfaces/resultsearch';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';


@Component({
  selector: 'app-search-text',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ReactiveFormsModule, MatButton, MatInputModule, MatPaginatorModule],
  templateUrl: './search-text.component.html',
  styleUrl: './search-text.component.css'
})
export class SearchTextComponent implements OnInit{

  homeService = inject(HomeService);
  resultSearch!: ResultSearch;
  arrayJokes: Joke[] = [];
  arrayJokesValues: string[] = [];
  totalJokes: number = 0;
  paginatedJokes: any[] = []; // Jokes to display on the current page
  pageSize: number = 5; // Number of jokes to display per page
  pageIndex: number = 0; // Current page index

  @ViewChild(MatPaginator) paginator!: MatPaginator;

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
        // Reset the paginator to the first page
      this.pageIndex = 0;

      // Force update of the first page after resetting paginator
      setTimeout(() => {
        this.paginator.firstPage();
        this.updatePaginatedJokes();
      }, 0);  // Ensure the paginator event is triggered after the search data is set
     }
   });
  }

  updatePaginatedJokes() {
    const startIndex = this.pageIndex * this.pageSize;
    this.paginatedJokes = this.arrayJokesValues.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedJokes();
  }


  ngOnInit(): void {
  }
}
