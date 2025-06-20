import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarViewComponent } from '../calendar-view/calendar-view.component';

@Component({
  selector: 'app-calendar-page',
  standalone: true,
  imports: [
    CommonModule,
    CalendarViewComponent
  ],
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.css']
})
export class CalendarPageComponent {
  @Input() sidebarVisible = true;
}
