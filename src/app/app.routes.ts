import { Routes } from '@angular/router';
import { CalendarViewComponent } from './views/calendar-view/calendar-view.component';

export const routes: Routes = [

  { path: 'calendario', component: CalendarViewComponent },
  { path: '', redirectTo: '/calendario', pathMatch: 'full' }
];
