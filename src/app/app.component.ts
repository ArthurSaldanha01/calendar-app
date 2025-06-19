import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./views/header/header.component";
import { SidebarComponent } from "./views/sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { CalendarPageComponent } from './views/calendar-page/calendar-page.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, SidebarComponent, CommonModule, CalendarPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'calendar-app';
  sidebarVisible = true;

  toggleSidebar(): void {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
