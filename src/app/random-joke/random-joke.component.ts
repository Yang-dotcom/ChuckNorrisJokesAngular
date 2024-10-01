import { Component, inject, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { Joke } from '../interfaces/joke';
import { RouterLink, RouterOutlet} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-random-joke',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ReactiveFormsModule, MatButtonModule],
  templateUrl: './random-joke.component.html',
  styleUrl: './random-joke.component.css'
})
export class RandomJokeComponent implements OnInit{

  categoriesArray: string[] = [];
  randomJoke: string = '';
  homeService = inject(HomeService);
  protected jokeForm = new FormGroup({
    categoryForm : new FormControl('')
  })


  public getCategories(){
    this.homeService
          .getEnabledCategories()
          .subscribe({
              next: (data: string[]) => {
                this.categoriesArray = data;
              }

            })
  }


  ngOnInit(): void {
    this.getCategories();
   }

  public getRandomJoke(){
    const category = this.jokeForm.get('categoryForm')?.value ?? null;
    this.homeService.getRandomJoke(category).subscribe({
        next: (data: Joke) => {
          this.randomJoke = data.value;
        }
    })
  }
}
