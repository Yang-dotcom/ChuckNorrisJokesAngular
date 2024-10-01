import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Joke } from '../interfaces/joke';
import { ResultSearch } from '../interfaces/resultsearch';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  HttpClient = inject(HttpClient)
  baseUrl = 'https://api.chucknorris.io/jokes'
  constructor() { }

  getEnabledCategories(){
    return this.HttpClient.get<string[]>(`${this.baseUrl}/categories`);
  }

  private getRandomJokeCategory(category: string){
    let params = new HttpParams().set('category', category)
    return this.HttpClient.get<Joke>(`${this.baseUrl}/random`, {params: params})
  }


  searchByText(text:string | null){

    if(text === null || text.trim() === ''){
      throw new Error('Text cannot be null or empty')
    }
    let params = new HttpParams().set('query', text)
    return this.HttpClient.get<ResultSearch>(`${this.baseUrl}/search`, {params: params})
  }

  getRandomJoke(category: string | null){
    if (category === null || category.trim() === '') {
      return this.HttpClient.get<Joke>(`${this.baseUrl}/random`);
    } else{
      return this.getRandomJokeCategory(category);
    }
  }


}
