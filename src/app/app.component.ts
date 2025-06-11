import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./views/header/header.component";
import { SidebarComponent } from "./views/sidebar/sidebar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HeaderComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'calendar-app';
}
