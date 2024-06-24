import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './Tours-Hotel-Page/home.component';  // Ensure this path is correct

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <main>
      <header class="brand-name">
        <h1>  Welcome to Flamingo Tours And Hotels</h1>
      </header>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css'],
  imports: [RouterModule, HomeComponent] // Order is RouterModule first, then HomeComponent
})
export class AppComponent {
  title = 'homes';
}
