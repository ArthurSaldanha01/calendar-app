import { Component, Input } from '@angular/core';
import { CalendarViewComponent } from '../calendar-view/calendar-view.component';
import { CreateEventComponent } from '../create-event/create-event.component';
import { CreateTaskComponent } from '../create-task/create-task.component';

@Component({
  selector: 'app-calendar-page',
  imports: [CalendarViewComponent, CreateEventComponent, CreateTaskComponent],
  templateUrl: './calendar-page.component.html',
  styleUrl: './calendar-page.component.css'
})
export class CalendarPageComponent {
  @Input() sidebarVisible: boolean = true;
}
