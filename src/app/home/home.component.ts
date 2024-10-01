import { Component} from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
}
