// app.component.ts
import { Component } from '@angular/core';
import { HeaderComponent } from './views/header/header.component';
import { SidebarComponent } from './views/sidebar/sidebar.component';
import { CalendarPageComponent } from './views/calendar-page/calendar-page.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, CommonModule, CalendarPageComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sidebarVisible = true;

  toggleSidebar(): void {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
