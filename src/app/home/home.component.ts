import { Component} from '@angular/core';
import { RouterOutlet, RouterLink, Router, NavigationEnd } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [
    trigger('pingAnimation', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        style({ transform: 'scale(0.8)', opacity: 0 }),
        animate('2s ease-in', style({ transform: 'scale(1)', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('4s ease-out', style({ transform: 'scale(0.8)', opacity: 0 })),
      ]),
    ]),
  ],
})
export class HomeComponent {
  chuckNorrisImage = "chucknorris.png";
  explosionImage = "nuclear-explosion-png-30060.png";
  explosionNorris = "explosion-norris.jpg"
  showExplosion: boolean = false;
  showExplodingNorris: boolean = false;
  showRouterOutlet: boolean = false;

  constructor(private router: Router) {
    // Listen for route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Hide the router-outlet when the path is not "" (e.g., "/random-joke", "/search-text")
        this.showRouterOutlet = event.urlAfterRedirects !== '/';
      }
    });
  }

  toggleImage() {
    this.showExplosion = true;
  }

  // When the first animation ends, show the second image
  onFirstAnimationEnd() {
      this.showExplosion = false;
      this.showExplodingNorris = true;

  }

  // When the second animation ends, hide the second image
  onSecondAnimationEnd() {

      this.showExplodingNorris = false;

  }
}
